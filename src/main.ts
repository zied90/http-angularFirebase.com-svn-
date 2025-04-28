spring:
  datasource:
    url: jdbc:sqlserver://${DB_HOST}:${DB_PORT};database=pfel;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;
    username: ${DB_USER}
    password: ${DB_PASS}
    driverClassName: com.microsoft.sqlserver.jdbc.SQLServerDriver
    # Keep the connection alive if idle for a long time (needed in production)
    testWhileIdle: true
    validationQuery: select 1 from dual

    # Show or not log for each sql query
    hikari:
      maximum-pool-size: 20
      minimum-idle: 10
      idle-timeout: 10000
      max-lifetime: 3300000
      connection-timeout: 3000
      connection-test-query: SELECT 1
  jpa:
    show-sql: true
    database-platform: org.hibernate.dialect.SQLServerDialect
    properties:
      hibernate.default_schema: sch_PFEL
      hibernate.format_sql: true
      hibernate.id.new_generator_mappings: true
      hibernate.cache.use_second_level_cache: false
      hibernate.cache.use_query_cache: false
      hibernate.generate_statistics: false
      # modify batch size as necessary
      hibernate.jdbc.batch_size: 25
      hibernate.order_inserts: true
      hibernate.order_updates: true
      hibernate.query.fail_on_pagination_over_collection_fetch: true
      hibernate.query.in_clause_parameter_padding: true
      #hibernate.bytecode.provider: none

  devtools:
    restart:
      quiet-period: 3s
      poll-interval: 5s



kmsClientId: 1c6d2ea9-5043-4935-bbc3-2ef8839db859
kmsClientSecret: test
confluentSaslPassword: test

honey:
  tracelog:
    active: false
  accesslog:
    active: false
    active-eda-sink: false
  appinfolog:
    active-eda-sink: false

  environment: INT



clients:
  fr-ged-api-documents-v2-vs:
    endpoint: https://eip-rec.axa-fr.intraxa/ws/fr-ged-api-documents-v2-vs
    compress: false
    auth: oauth
    auth-config:
      grant-type: application
      token-endpoint: https://onelogin.dev.axa.com/as/token.oauth2
      scopes: urn:axa:france:ged:cst urn:axa:france:ged:mng urn:axa:france:ged:src
      client-id: 51388898
      client-secret: testscret
      client-assertion: jwt
  fr-ecm-ews-next-mng-document-v1-vs:
    endpoint: https://eip-rec.axa-fr.intraxa/ws/fr-ecm-ews-next-mng-document-v1-vs
    #endpoint: http://next-ondemand-dev.corp.intraxa:8082/EngineServiceNext/EngineService
    auth: basic
    compress: false
    auth-config:
      username: CLT_PFEL
      #username: EIP_MNG_USR
      #password: aToqEWvbpyLho55qqiF0
      password: azerty@1234567

  fr-ged-mng-documents-v4-vs:
    endpoint: https://eip-rec.axa-fr.intraxa/ws/fr-ged-mng-documents-v4-vs
    auth: basic
    auth-config:
      username: ecm_pfel
      password: 3qFk0Yuqb86roVB1R5xh

  fr-ged-cst-documents-v4-vs:
    endpoint: https://eip-rec.axa-fr.intraxa/ws/fr-ged-cst-documents-v4-vs
    auth: basic
    auth-config:
      username: ecm_pfel_solaris_uap
      password: E@c!M_180620@SoLaRiS

  fr-ged-src-documents-v4-vs:
    endpoint: https://eip-rec.axa-fr.intraxa/ws/fr-ged-src-documents-v4-vs
    auth: basic
    auth-config:
      username: ecm_pfel_solaris_uap
      password: E@c!M_180620@SoLaRiS

  fr-ged-cst-documents-v4-vs-sante:
    endpoint: https://eip-rec.axa-fr.intraxa/ws/fr-ged-cst-documents-v4-vs
    auth: basic
    auth-config:
      username: ecm_pfel_kiosk
      password: C||ohKtmK85oJw|nI.3A

  fr-ged-src-documents-v4-vs-sante:
    endpoint: https://eip-rec.axa-fr.intraxa/ws/fr-ged-src-documents-v4-vs
    auth: basic
    auth-config:
      username: ecm_pfel_kiosk
      password: C||ohKtmK85oJw|nI.3A

  fr-pfel-mng-convertandconcatdoc-v1-vs:
    endpoint: https://eip-rec.axa-fr.intraxa/ws/fr-pfel-mng-convertandconcatdoc-v1-vs
    auth: basic
    compress: false
    auth-config:
      username: usr_eip
      password: usr_eipPFEL
    soap-config:
      enforce-binding: SOAP12

  wordtopdf:
    endpoint: https://eip-rec.axa-fr.intraxa/ws/fr-pfel-mng-wordtopdf-v1-vs
    auth: basic
    compress: false
    auth-config:
      username: CLT_PFEL
      password: azerty@1234567

  fr-ged-mng-envoidemande-mtom-v2-vs:
    endpoint: https://eip-rec.axa-fr.intraxa/ws/fr-ged-mng-envoidemande-mtom-v2-vs
    auth: basic
    auth-config:
      username: CLT_PFEL
      password: azerty@1234567
    soap-config:
      enforce-binding: SOAP12

  fr-pfel-mng-orchestredi-v1-vs_1:
    endpoint: https://eip-rec.axa-fr.intraxa/ws/fr-pfel-mng-orchestredi-v1-vs
    auth: basic
    auth-config:
      username: CLT_PFEL
      password: azerty@1234567

  fr-save-documents-nas-v1-vs:
    endpoint: https://eip-dev.axa-fr.intraxa/ws/fr-pfel-mng-synchrodocument-v1-vs
    auth: basic
    compress: false
    auth-config:
      username: CLT_PFEL
      password: azerty@1234567
  fr-next-empower-v1-vs:
    endpoint: https://api-empower-dev.corp.intraxa/mpw/resource
    auth: basic
    compress: false
    auth-config:
      username: CLT_PFEL_AFR
      password: CLT_PFEL_AFR1

wspfelv3:
  printer:
    api:
      baseUrl: http://localhost:9090
      uri: /wspfelv3-printer/print/pdf

azure:
  storage:
    connection-string: DefaultEndpointsProtocol=https;AccountName=${STORAGE_ACCOUNT_NAME};AccountKey=${STORAGE_ACCOUNT_KEY};EndpointSuffix=core.windows.net
  containers:
    - document
    - tmp

---
spring:
  config:
    activate:
      on-profile: local
fr:
  axa:
    pfel:
      serveur:
        file: E:\Docdata\PFELV5\
server:
  port: 8084
---
spring:
  config:
    activate:
      on-profile: test
fr:
  axa:
    pfel:
      serveur:
        file: target\Docdata\PFELV5\
