    <Typeahead
              id="typeahead-template"
              labelKey="template"
              options={allOptions}
              placeholder="Choisir un template..."
              selected={selectedTemplateOption}
              onInputChange={(text) => {
                setQueryTemplate(text);
                if (text.length < 2) {
                  setFormData({ ...formData, templateId: null });
                }
              }}
              onChange={(selected) => {
                if (selected.length > 0) {
                  setFormData({
                    ...formData,
                    templateId: (selected[0] as TemplateOption).id,
                  });
                } else {
                  setFormData({ ...formData, templateId: null });
                }
              }}
              clearButton
              isLoading={isFetching}
              minLength={2}
              inputProps={{ name: "template" }}
            />
