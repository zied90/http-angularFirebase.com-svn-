
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <parent>
    <groupId>fr.axa.pfel.wspfelv3</groupId>
    <artifactId>wspfelv3-reactor</artifactId>
    <version>1.2.0-SNAPSHOT</version>
  </parent>

  <groupId>fr.axa.pfel.client</groupId>
  <artifactId>ged-mng-client</artifactId>

  <name>ged-mng-client</name>

<!--  <properties>
    <location.wsdl>fr-ged-mng-documents-v4-vs_1.wsdl</location.wsdl>
    <sonar.skip>true</sonar.skip>
  </properties>-->
  <properties>
    <location.wsdl>fr-ged-mng-documents-v4-vs_1.wsdl</location.wsdl>
    <yaml.file>${project.basedir}/src/main/resources/swagger.yml</yaml.file>
    <package>${project.groupId}</package>
    <generated-sources-path>${project.build.directory}/generated-sources</generated-sources-path>
    <generated-sources-java-path>main/java</generated-sources-java-path>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <sonar.skip>true</sonar.skip>
  </properties>

<!--  <dependencies>
    <dependency>
      <groupId>fr.axa.honey.framework</groupId>
      <artifactId>honey-soapclient-starter</artifactId>
    </dependency>


  </dependencies>-->
  <dependencies>
    <dependency>
      <groupId>fr.axa.honey.framework</groupId>
      <artifactId>honey-restclient-starter</artifactId>
    </dependency>
    <dependency>
      <groupId>fr.axa.honey.framework</groupId>
      <artifactId>honey-soapclient-starter</artifactId>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
      </plugin>
      <plugin>
        <groupId>org.apache.cxf</groupId>
        <artifactId>cxf-codegen-plugin</artifactId>
        <executions>
          <execution>
            <id>generate-sources</id>
            <phase>generate-sources</phase>
            <configuration>
              <sourceRoot>${project.build.directory}/generated/cxf</sourceRoot>
              <wsdlOptions>
                <wsdlOption>
                  <!-- where to find the wsdl to *generate* sources -->
                  <wsdl>${project.build.resources[0].directory}/${location.wsdl}</wsdl>

                  <!-- were to find the wsdl at *runtime*. Very important to use
                    a classpath: url and not a remote one. -->
                  <wsdlLocation>classpath:${location.wsdl}</wsdlLocation>

                  <extraargs>
                    <!-- http://cxf.apache.org/docs/wsdl-to-java.html -->

                    <extraarg>-verbose</extraarg>
                    <extraarg>-autoNameResolution</extraarg>
                    <extraarg>-nexclude</extraarg>
                    <extraarg>http://www.w3.org/2006/03/addressing=org.apache.cxf.ws.addressing</extraarg>
                    <extraarg>-nexclude</extraarg>
                    <extraarg>http://www.w3.org/2005/08/addressing=org.apache.cxf.ws.addressing</extraarg>
                  </extraargs>

                  <bindingFiles>
                    <bindingFile>${cxf.bindings.dir}/jaxwsBindings.xml</bindingFile>
                    <bindingFile>${cxf.bindings.dir}/jaxbBindings.xml</bindingFile>
                  </bindingFiles>

                  <!-- generate explicit soap header classes by default -->
                  <extendedSoapHeaders>true</extendedSoapHeaders>
                </wsdlOption>
              </wsdlOptions>
            </configuration>
            <goals>
              <goal>wsdl2java</goal>
            </goals>
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
                <source>target/generated/cxf</source>
              </sources>
            </configuration>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>

</project>
 et cai ca FO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  01:32 min
[INFO] Finished at: 2025-04-24T12:07:40+02:00
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-clean-plugin:3.4.0:clean (default-clean) on project group-document-taskevt-client-1: Failed to clean project: Failed to delete C:\dev\Backend\wspfelV3\group-document-taskevt-client-1\target\classes\fr\axa\honey\eda\client\pfel\groupdocumenttask -> [Help 1]
[ERROR]
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.
[ERROR]
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoExecutionException
[ERROR]
[ERROR] After correcting the problems, you can resume the build with the command
[ERROR]   mvn <args> -rf :group-document-taskevt-client-1

C:\dev\Backend\wspfelV3>









et avant mon modof cestait ca le contenu

<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <parent>
    <groupId>fr.axa.pfel.wspfelv3</groupId>
    <artifactId>wspfelv3-reactor</artifactId>
    <version>1.2.0-SNAPSHOT</version>
  </parent>

  <groupId>fr.axa.pfel.client</groupId>
  <artifactId>ged-mng-client</artifactId>

  <name>ged-mng-client</name>

  <properties>
    <location.wsdl>fr-ged-mng-documents-v4-vs_1.wsdl</location.wsdl>
    <sonar.skip>true</sonar.skip>
  </properties>

  <dependencies>
    <dependency>
      <groupId>fr.axa.honey.framework</groupId>
      <artifactId>honey-soapclient-starter</artifactId>
    </dependency>


  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
      </plugin>
      <plugin>
        <groupId>org.apache.cxf</groupId>
        <artifactId>cxf-codegen-plugin</artifactId>
        <executions>
          <execution>
            <id>generate-sources</id>
            <phase>generate-sources</phase>
            <configuration>
              <sourceRoot>${project.build.directory}/generated/cxf</sourceRoot>
              <wsdlOptions>
                <wsdlOption>
                  <!-- where to find the wsdl to *generate* sources -->
                  <wsdl>${project.build.resources[0].directory}/${location.wsdl}</wsdl>

                  <!-- were to find the wsdl at *runtime*. Very important to use
                    a classpath: url and not a remote one. -->
                  <wsdlLocation>classpath:${location.wsdl}</wsdlLocation>

                  <extraargs>
                    <!-- http://cxf.apache.org/docs/wsdl-to-java.html -->

                    <extraarg>-verbose</extraarg>
                    <extraarg>-autoNameResolution</extraarg>
                    <extraarg>-nexclude</extraarg>
                    <extraarg>http://www.w3.org/2006/03/addressing=org.apache.cxf.ws.addressing</extraarg>
                    <extraarg>-nexclude</extraarg>
                    <extraarg>http://www.w3.org/2005/08/addressing=org.apache.cxf.ws.addressing</extraarg>
                  </extraargs>

                  <bindingFiles>
                    <bindingFile>${cxf.bindings.dir}/jaxwsBindings.xml</bindingFile>
                    <bindingFile>${cxf.bindings.dir}/jaxbBindings.xml</bindingFile>
                  </bindingFiles>

                  <!-- generate explicit soap header classes by default -->
                  <extendedSoapHeaders>true</extendedSoapHeaders>
                </wsdlOption>
              </wsdlOptions>
            </configuration>
            <goals>
              <goal>wsdl2java</goal>
            </goals>
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
                <source>target/generated/cxf</source>
              </sources>
            </configuration>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>

</project>  je vexu rajouter la partie swagger dans le fichier en gardant lerxistant voci une exemple que tu peux inspirer de lui <?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <parent>
    <artifactId>wspfelv3-reactor</artifactId>
    <groupId>fr.axa.pfel.wspfelv3</groupId>
    <version>1.2.0-SNAPSHOT</version>
  </parent>
  <groupId>fr.axa.pfel.client</groupId>
  <artifactId>empower-client</artifactId>


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

