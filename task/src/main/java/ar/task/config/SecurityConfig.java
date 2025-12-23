package ar.task.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    //  EL FILTRO DE SEGURIDAD
    // Este método configura qué URLs son públicas y cuáles privadas.
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desactivamos CSRF (necesario para APIs REST simples)
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // 🔓 AQUI EL TRUCO: Permitimos TODO por ahora
            );

        return http.build();
    }

    //  LA HERRAMIENTA DE ENCRIPTACIÓN
    // Creamos un "Bean" para poder inyectarlo en el Servicio después.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}