package com.company.cardatabase.web;

import com.company.cardatabase.domain.AccountCredentials;
import com.company.cardatabase.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials) {

        UsernamePasswordAuthenticationToken creds
            = new UsernamePasswordAuthenticationToken(credentials.username(),
                                                      credentials.password());

        Authentication auth = authenticationManager.authenticate(creds);

        // 토근을 생성
        String jwts = jwtService.getToken(auth.getName());

        // 생성된 토큰으로 응답을 빌드
        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION,
                "Bearer " + jwts).header(HttpHeaders
                .ACCESS_CONTROL_EXPOSE_HEADERS,
                "Authorization").build();
    }
}
