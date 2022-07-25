package de.trion.training.auth;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Table(name = "TBL_AUTH_AUTHORITIES")
public class GrantedAuthorityEntity implements GrantedAuthority
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String authority;

    @ManyToOne
    private UserEntity userEntity;

    GrantedAuthorityEntity(String authority) {
        this.authority = authority;
    }

    public GrantedAuthorityEntity()
    {
    }

    public void setAuthority(String authority)
    {
        this.authority = authority;
    }

    @Override
    public String getAuthority()
    {
        return authority;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }

    public Integer getId()
    {
        return id;
    }

    public UserEntity getUserEntity()
    {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity)
    {
        this.userEntity = userEntity;
    }

    @Override
    public String toString()
    {
        return authority;
    }
}
