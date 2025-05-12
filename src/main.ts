package fr.axa.pfel.wspfelv3.domain.document;


import fr.axa.pfel.wspfelv3.constant.SettingType;
import java.io.Serializable;
import java.util.Date;
import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Data;

/**
 *
 */
@Data
public class TechnicalData extends InfoUser implements Serializable {

    private Date dateCreation;
    private String template;
    private String country;
    private String idRequest;
    private String nameDocument;
    private String correlationId;
    private Settings settings;
    private DematDocs dematDocs;

    public Optional<Setting> getTypeDocSetting() {
        if (settings != null && settings.getSettings() != null) {
            return getSettingByType(SettingType.TYPE_DOC);
        }

        return Optional.empty();
    }

    public boolean isEsign() {
        if (settings != null && settings.getSettings() != null) {
            return settings.getSettings().stream()
                .anyMatch(setting -> (SettingType.ESIGN.getValue().equals(setting.getSetting()) &&
                    (EsignValue.SIGNED.getValue().equals(setting.getValue())
                        || EsignValue.YES.getValue().equals(setting.getValue())))
                );
        }

        return false;
    }

    public Setting getAppIdSetting() {
        Optional<Setting> result = Optional.empty();
        if (settings != null) {
            result = getSettingByType(SettingType.APPID);
        }
        return result.orElse(null);
    }


    private Optional<Setting> getSettingByType(SettingType settingType) {
        return settings.getSettings().stream()
            .filter(setting -> settingType.getValue().equals(setting.getSetting()))
            .findAny();
    }


    private enum EsignValue {
        YES("O"), NO("N"), SIGNED("S");

        private final String value;

        EsignValue(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }
}
