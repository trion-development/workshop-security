package de.trion.training.api;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/userinfo")
public class UserInfo
{
    @GetMapping
    public UserDetails userinfo(@AuthenticationPrincipal UserDetails userDetails) {
        return userDetails;
    }
}
