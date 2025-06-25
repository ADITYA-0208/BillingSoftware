package in.adityakhanna.billingsoftware.controller;

import in.adityakhanna.billingsoftware.io.AuthRequest;
import in.adityakhanna.billingsoftware.io.AuthResponse;
import in.adityakhanna.billingsoftware.service.UserService;
import in.adityakhanna.billingsoftware.service.impl.AppUserDetailsService;
import in.adityakhanna.billingsoftware.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appUserDetailsService;
    private final UserService userService;

    private final JwtUtil jwtUtil;


    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        // ✅ No validation, no DB, no exceptions
        UserDetails userDetails = org.springframework.security.core.userdetails.User
            .withUsername(request.getEmail())
            .password("dummy")
            .roles("ADMIN") // or USER
            .build();
    
        String jwtToken = jwtUtil.generateToken(userDetails);
    
        return new AuthResponse(request.getEmail(), jwtToken, "ROLE_ADMIN");
    }
    
}
