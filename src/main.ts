<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <parent>
    <groupId>fr.axa.pfel.wspfelv3</groupId>
    <artifactId>wspfelv3-reactor</artifactId>
    <version>1.2.0-SNAPSHOT</version>
  </parent>

  <groupId>fr.axa.pfel.client</groupId>
  <artifactId>ged-cst-client</artifactId>

  <name>ged-cst-client</name>

  <properties>
    <yaml.file>${project.basedir}/src/main/resources/swagger.yml</yaml.file>
    <package>${project.groupId}</package>
    <generated-sources-path>${project.build.directory}/generated-sources</generated-sources-path>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <sonar.skip>true</sonar.skip>
  </properties>

  <dependencies>
    <dependency>
      <groupId>fr.axa.honey.framework</groupId>
      <artifactId>honey-restclient-starter</artifactId>
    </dependency>

    <dependency>
      <groupId>com.fasterxml.jackson.dataformat</groupId>
      <artifactId>jackson-dataformat-xml</artifactId>
    </dependency>
    <!-- Because JAXB API from javax.* dependencies are now excluded in RestClient Starter artifact -->
    <dependency>
      <groupId>fr.axa.eip.client</groupId>
      <artifactId>honey-jaxb-runtime</artifactId>
    </dependency>


  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.openapitools</groupId>
        <artifactId>openapi-generator-maven-plugin</artifactId>

        <executions>
          <execution>
            <phase>generate-sources</phase>
            <goals>
              <goal>generate</goal>
            </goals>
            <configuration>
              <inputSpec>${yaml.file}</inputSpec>
              <generatorName>java</generatorName>
              <library>feign</library>
              <modelPackage>${package}.model</modelPackage>
              <apiPackage>${package}.impl</apiPackage>
              <generateApis>true</generateApis>
              <generateApiTests>false</generateApiTests>
              <generateSupportingFiles>true</generateSupportingFiles>

              <supportingFilesToGenerate>ApiResponse.java</supportingFilesToGenerate>
              <invokerPackage>fr.axa.honey.client.rest.feign</invokerPackage>
              <typeMappings>
                <!-- To avoid saving the file on disk. You can also set File=org.springframework.web.multipart.MultipartFile -->
                <typeMapping>File=feign.form.FormData</typeMapping>
              </typeMappings>
              <configOptions>
                <dateLibrary>java8</dateLibrary>

              </configOptions>
              <output>${generated-sources-path}</output>
            </configuration>
          </execution>
        </executions>
      </plugin>
      <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>build-helper-maven-plugin</artifactId>
        <executions>
          <execution>
            <id>add-source</id>
            <phase>generate-sources</phase>
            <goals>
              <goal>add-source</goal>
            </goals>
            <configuration>
              <sources>
                <source>${generated-sources-path}/src/main/java</source>
              </sources>
            </configuration>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>

</project>
