package com.company.hardatabase.service;

import com.company.hardatabase.domain.User;
import com.company.hardatabase.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String registerUser(User user) {
        // 아이디 또는 이메일 중복 체크
        if (userRepository.findByUsernameOrEmail(user.getUsername(), user.getEmail()) != null) {
            return "이미 존재하는 아이디 또는 이메일입니다.";
        }

        // 비밀번호 암호화 후 저장
        userRepository.save(user);

        return "회원가입 성공!";
    }

    public User validateUser(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username, password);
        return user;
    }
}
