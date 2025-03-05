package com.company.hardatabase.repository;

import com.company.hardatabase.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserRepository {

    @Insert("INSERT INTO users (username, password, email, profile_img) VALUES (#{username}, #{password}, #{email}, #{profileImg})")
    void save(User user);

    @Select("SELECT * FROM users WHERE username = #{username} AND password = #{password}")
    User findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    @Select("SELECT * FROM users WHERE username = #{username} OR email = #{email}")
    User findByUsernameOrEmail(@Param("username") String username, @Param("email") String email);
}
