package com.example.mi_api_rest.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // 1. Inyectamos el valor desde application.properties (o variable de entorno)
    @Value("${cors.allowed-origins}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 2. Convertimos el texto (separado por comas) en una lista de URLs
        // Si la variable viene vacía por error, evitamos que falle usando un array vacío
        String[] origins = allowedOrigins != null ? allowedOrigins.split(",") : new String[]{};

        registry.addMapping("/**")
                .allowedOrigins(origins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);

        // (Opcional) Log para que veas en la consola qué URLs se aceptaron al arrancar
        System.out.println("CORS configurado para: " + allowedOrigins);
    }
}