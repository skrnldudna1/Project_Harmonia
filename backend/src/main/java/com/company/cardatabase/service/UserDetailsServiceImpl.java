package com.company.cardatabase.service;

import com.company.cardatabase.domain.AppUser;
import com.company.cardatabase.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final AppUserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<AppUser> user = repository.findByUsername(username);

        User.UserBuilder builder = null;
        if(user.isPresent()){
            AppUser currentUser = user.get();
            builder = org.springframework.security.core
                      .userdetails.User.withUsername(username);
            builder.password(currentUser.getPassword());
            builder.roles(currentUser.getRole());
        }else{
            throw new UsernameNotFoundException("User not found");
        }
        return builder.build();
    }
}
