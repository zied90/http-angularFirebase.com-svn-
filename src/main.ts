package fr.axa.pfel.ellipse.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import fr.axa.pfel.ellipse.model.Portfolio;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;


import java.util.*;
import jakarta.annotation.Generated;

/**
 * objet Utilisateur
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-01-10T10:31:36.792562300+01:00[Europe/Paris]", comments = "Generator version: 7.7.0")
public class User {

  private Integer id;

  private String email;

  private String userNumber;

  private String axaUiRdu;

  private String axaType;

  private String name;

  @Valid
  private List<@Valid Portfolio> portfolios;

  /**
   * Gets or Sets authorities
   */
  public enum AuthoritiesEnum {
    ADMIN("ADMIN"),
    
    AGT("AGT"),
    
    AXA_PART("AXA_PART"),
    
    RET_COLLECTIVE("RET_COLLECTIVE"),
    
    PREV_COLLECTIVE("PREV_COLLECTIVE"),
    
    REN_INDIVIDUELLES("REN_INDIVIDUELLES");

    private String value;

    AuthoritiesEnum(String value) {
      this.value = value;
    }

    @JsonValue
    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static AuthoritiesEnum fromValue(String value) {
      for (AuthoritiesEnum b : AuthoritiesEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
  }

  @Valid
  private List<AuthoritiesEnum> authorities;

  public User id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * identifiant de l'utilisateur
   * @return id
   */
  
  @JsonProperty("id")
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public User email(String email) {
    this.email = email;
    return this;
  }

  /**
   * email de l'utilisateur
   * @return email
   */
  
  @JsonProperty("email")
  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public User userNumber(String userNumber) {
    this.userNumber = userNumber;
    return this;
  }

  /**
   * matricule de l'utilisateur
   * @return userNumber
   */
  
  @JsonProperty("userNumber")
  public String getUserNumber() {
    return userNumber;
  }

  public void setUserNumber(String userNumber) {
    this.userNumber = userNumber;
  }

  public User axaUiRdu(String axaUiRdu) {
    this.axaUiRdu = axaUiRdu;
    return this;
  }

  /**
   * Identifiant RDU de l'utilisateur
   * @return axaUiRdu
   */
  
  @JsonProperty("axaUiRdu")
  public String getAxaUiRdu() {
    return axaUiRdu;
  }

  public void setAxaUiRdu(String axaUiRdu) {
    this.axaUiRdu = axaUiRdu;
  }

  public User axaType(String axaType) {
    this.axaType = axaType;
    return this;
  }

  /**
   * Type axa de l'utilisateur
   * @return axaType
   */
  
  @JsonProperty("axaType")
  public String getAxaType() {
    return axaType;
  }

  public void setAxaType(String axaType) {
    this.axaType = axaType;
  }

  public User name(String name) {
    this.name = name;
    return this;
  }

  /**
   * nom de l'utilisateur
   * @return name
   */
  
  @JsonProperty("name")
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public User portfolios(List<@Valid Portfolio> portfolios) {
    this.portfolios = portfolios;
    return this;
  }

  public User addPortfoliosItem(Portfolio portfoliosItem) {
    if (this.portfolios == null) {
      this.portfolios = new ArrayList<>();
    }
    this.portfolios.add(portfoliosItem);
    return this;
  }

  /**
   * Get portfolios
   * @return portfolios
   */
  @Valid 
  @JsonProperty("portfolios")
  public List<@Valid Portfolio> getPortfolios() {
    return portfolios;
  }

  public void setPortfolios(List<@Valid Portfolio> portfolios) {
    this.portfolios = portfolios;
  }

  public User authorities(List<AuthoritiesEnum> authorities) {
    this.authorities = authorities;
    return this;
  }

  public User addAuthoritiesItem(AuthoritiesEnum authoritiesItem) {
    if (this.authorities == null) {
      this.authorities = new ArrayList<>();
    }
    this.authorities.add(authoritiesItem);
    return this;
  }

  /**
   * Get authorities
   * @return authorities
   */
  
  @JsonProperty("authorities")
  public List<AuthoritiesEnum> getAuthorities() {
    return authorities;
  }

  public void setAuthorities(List<AuthoritiesEnum> authorities) {
    this.authorities = authorities;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    User user = (User) o;
    return Objects.equals(this.id, user.id) &&
        Objects.equals(this.email, user.email) &&
        Objects.equals(this.userNumber, user.userNumber) &&
        Objects.equals(this.axaUiRdu, user.axaUiRdu) &&
        Objects.equals(this.axaType, user.axaType) &&
        Objects.equals(this.name, user.name) &&
        Objects.equals(this.portfolios, user.portfolios) &&
        Objects.equals(this.authorities, user.authorities);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, email, userNumber, axaUiRdu, axaType, name, portfolios, authorities);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class User {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    email: ").append(toIndentedString(email)).append("\n");
    sb.append("    userNumber: ").append(toIndentedString(userNumber)).append("\n");
    sb.append("    axaUiRdu: ").append(toIndentedString(axaUiRdu)).append("\n");
    sb.append("    axaType: ").append(toIndentedString(axaType)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    portfolios: ").append(toIndentedString(portfolios)).append("\n");
    sb.append("    authorities: ").append(toIndentedString(authorities)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

    @Override
    @PreAuthorize("hasPermission('user', 'create')")
    public ResponseEntity<Void> userDeploy(User user) {
        final UserModel userModel = new UserModel();
        userModel.setEmail(user.getEmail());
        userModel.setUserNumber(user.getUserNumber());
        userModel.setName(user.getName());
        userModel.setAuthorities(createAuthorities(user.getAuthorities()));
        userService.deployUser(userModel);
        return ResponseEntity.ok().build();
    }    comment ca genere user.getAuthorities() je dois passer quaoi a lapi 
