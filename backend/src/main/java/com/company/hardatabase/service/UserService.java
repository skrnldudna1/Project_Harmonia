package com.company.hardatabase.service;

import com.company.hardatabase.domain.User;
import com.company.hardatabase.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService fileStorageService;

    // 생성자 주입 방식으로 변경
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, FileStorageService fileStorageService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.fileStorageService = fileStorageService;
    }

    public Optional<User> login(String username, String rawPassword) {
        return userRepository.findByUsername(username)
                .filter(user -> {
                    boolean matches = passwordEncoder.matches(rawPassword, user.getPassword());
                    System.out.println("✅ 비밀번호 검증 결과: " + matches);
                    return matches;
                })
                .map(user -> {
                    System.out.println("✅ 로그인 성공! 유저 정보: " + user);
                    return user;
                });
    }




    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Not found"));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_USER")));
    }

    public User registerUser(String username, String rawPassword, String email, String nickname) {
        String encodedPassword = passwordEncoder.encode(rawPassword);
        if (nickname == null || nickname.trim().isEmpty()) {
            nickname = username; // 닉네임이 비어 있으면 username으로 설정
        }

        User newUser = new User(username, encodedPassword, email, nickname);
        return userRepository.save(newUser);
    }


    // 기존 평면 비밀번호 암호화
    public void encryptExistingPasswords() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (!user.getPassword().startsWith("$2a$")) {  // 이미 암호화된 비밀번호는 제외
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userRepository.save(user);
            }
        }
    }

    public User updateNickname(Long userId, String newNickname) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (newNickname == null || newNickname.trim().isEmpty()) {
            newNickname = user.getUsername(); // 닉네임이 없을 경우 username 유지
        }

        user.setNickname(newNickname);
        return userRepository.save(user);
    }


    public User updateProfileImage(Long userId, MultipartFile file) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 파일 저장 및 URL 반환
        String fileName = fileStorageService.storeFile(file);
        String fileDownloadUri = "/uploads/" + fileName;

        // 유저 프로필 이미지 업데이트
        user.setProfileImg(fileDownloadUri);
        return userRepository.save(user);
    }

}
