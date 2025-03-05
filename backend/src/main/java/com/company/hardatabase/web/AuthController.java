package com.company.hardatabase.web;

import com.company.hardatabase.domain.User;
import com.company.hardatabase.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("로그인 정보 없음");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user, HttpSession session) {
        String result = userService.registerUser(user);
        if (result.equals("회원가입 성공!")) {
            session.setAttribute("user", user);  // ✅ 회원가입 후 자동 로그인
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user, HttpSession session) {
        User validUser = userService.validateUser(user.getUsername(), user.getPassword());

        if (validUser != null) {
            session.setAttribute("user", validUser);
            return ResponseEntity.ok("로그인 성공!");
        } else {
            return ResponseEntity.status(401).body("로그인 실패: 아이디 또는 비밀번호 오류");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("로그아웃 성공!");
    }
}
