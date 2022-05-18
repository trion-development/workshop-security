package de.trion.training.events;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.security.access.intercept.AbstractSecurityInterceptor;
import org.springframework.stereotype.Component;

@Component
public class EnableAuthSuccessEventConfigurer implements BeanPostProcessor {
    @Override // see https://github.com/spring-projects/spring-security/issues/9705
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        if (bean instanceof AbstractSecurityInterceptor interceptor) {
            interceptor.setPublishAuthorizationSuccess(true);
        }
        return bean;
    }
}
