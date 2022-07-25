package de.trion.training.auth;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;

@Service
public class JpaUserDetailsManager implements UserDetailsManager
{
    private final UserRepository userRepository;

    public JpaUserDetailsManager(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    @Override
    public void createUser(UserDetails user)
    {
        var entity = new UserEntity(user.getUsername(), user.getPassword(), user.getAuthorities());
        entity.setEnabled(user.isEnabled());
        entity.setLocked(! user.isAccountNonLocked());
        userRepository.save(entity);
    }

    @Override
    public void updateUser(UserDetails user)
    {
        createUser(user);
    }

    @Override
    public void deleteUser(String username)
    {
        userRepository.deleteByUsername(username);
    }

    @Override
    public void changePassword(String oldPassword, String newPassword)
    {
        var username = SecurityContextHolder.getContext().getAuthentication().getName();

        var user = userRepository.findByUsernameIgnoreCase(username);
        user.setPassword(newPassword);
    }

    @Override
    public boolean userExists(String username)
    {
        return userRepository.existsByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        return userRepository.findByUsernameIgnoreCase(username);
    }
}
