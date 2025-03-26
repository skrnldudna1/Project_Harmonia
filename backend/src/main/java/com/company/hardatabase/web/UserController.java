package com.company.hardatabase.web;

import com.company.hardatabase.domain.User;
import com.company.hardatabase.security.CustomUserDetails;
import com.company.hardatabase.service.UserService;
import com.company.hardatabase.config.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        Optional<User> loggedInUser = userService.login(username, password);
        Map<String, Object> response = new HashMap<>();

        if (loggedInUser.isPresent()) {
            String token = jwtTokenUtil.generateToken(username);
            response.put("user", loggedInUser.get());
            response.put("token", token);
            System.out.println("✅ 로그인 성공! 유저 정보: " + loggedInUser.get());
            System.out.println("✅ 토큰: " + token);
            return ResponseEntity.ok(response);
        } else {
            response.put("error", "로그인 실패: 아이디 또는 비밀번호가 틀립니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }



    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (user.getUsername() == null || user.getPassword() == null || user.getEmail() == null) {
            return ResponseEntity.badRequest().body("회원가입 실패: 모든 필드를 입력해야 합니다.");
        }
        try {
            User savedUser = userService.registerUser(user.getUsername(), user.getPassword(), user.getEmail(), user.getNickname());
            return ResponseEntity.ok("회원가입 성공!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 실패: " + e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication auth) {
        System.out.println("✅ /me 요청 도착 - 인증 객체: " + auth);

        if (auth == null || auth.getName() == null) {
            System.out.println("❌ 로그인된 사용자 없음 (auth 또는 auth.getName()이 null)");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("사용자 인증 정보 없음");
        }

        Optional<User> user = userService.getUserByUsername(auth.getName());

        if (user.isEmpty()) {
            System.out.println("❌ 사용자 정보 없음 (DB에서 찾을 수 없음): " + auth.getName());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("유저 정보 없음");
        }

        System.out.println("✅ 현재 로그인된 유저 정보: " + user.get());
        return ResponseEntity.ok(user.get());
    }


    // 사용자 프로필 사진 변경
    @PostMapping("/api/users/{userId}/profile-img")
    public ResponseEntity<User> updateProfileImage(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file) {
        User updatedUser = userService.updateProfileImage(userId, file);
        return ResponseEntity.ok(updatedUser);
    }


    // 닉네임 변경
    @PatchMapping("/{userId}/nickname")
    @PreAuthorize("isAuthenticated()") // 인증된 사용자만 변경 가능
    public ResponseEntity<?> updateNickname(
            @PathVariable Long userId,
            @RequestBody Map<String, String> request,
            @AuthenticationPrincipal UserDetails userDetails) {

        // userDetails가 null인지 확인 (비로그인 사용자는 차단)
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 정보가 없습니다.");
        }

        // DB에서 userId를 가져와 로그인한 사용자와 비교
        User loggedInUser = userService.findByUsername(userDetails.getUsername());
        if (loggedInUser == null || !loggedInUser.getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("본인의 닉네임만 변경할 수 있습니다.");
        }

        // 닉네임 변경 로직 실행
        String newNickname = request.get("nickname");
        User updatedUser = userService.updateNickname(userId, newNickname);
        return ResponseEntity.ok(updatedUser);
    }



}
