package com.luv2shopdev.ecommerce.config;

import com.luv2shopdev.ecommerce.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import java.util.ArrayList;

@Configuration
public class SpringDataRestConfig implements RepositoryRestConfigurer {

    @Value("${allowed.origins}")
    private String[] allowedOrigins;

    private EntityManager entityManager;

    @Autowired
    public SpringDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] unsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH};

        // disable HTTP methods: PUT, POST, DELETE and PATCH
        disableHttpMethods(Product.class, config, unsupportedActions);
        disableHttpMethods(ProductCategory.class, config, unsupportedActions);
        disableHttpMethods(Country.class, config, unsupportedActions);
        disableHttpMethods(State.class, config, unsupportedActions);
        //disableHttpMethods(Order.class, config, unsupportedActions);

        // call an internal helper method
        exposeIds(config);

        // configure cors mapping
        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(allowedOrigins);
    }

    private static void disableHttpMethods(Class mClass, RepositoryRestConfiguration config, HttpMethod[] unsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(mClass)
                .withItemExposure(((metadata, httpMethods) -> httpMethods.disable(unsupportedActions)))
                .withCollectionExposure(((metadata, httpMethods) -> httpMethods.disable(unsupportedActions)));
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        // expose entity ids

        // get a list of all entity classes from the entity manager
        var entities = entityManager.getMetamodel().getEntities();

        // create an array of the entity types
        var entityClasses = new ArrayList<>();

        // get the entity types for the entities
        for (var item :
                entities) {
            entityClasses.add(item.getJavaType());
        }

        // expose the entity ids for the array of entity/domain types
        var domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
