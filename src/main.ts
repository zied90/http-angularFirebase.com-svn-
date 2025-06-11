/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ChangeEvent,
  ForwardedRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery } from "react-query";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  CheckboxInput,
  CustomInputDate,
  InputSelect,
} from "@/components/atoms";
import actionStore from "@/stores/actions/actionsStore";
import { getActions } from "@/api/apifunctions/action/actions";
import { getLogsApp } from "@/api/apifunctions/application/application";
import applicationsLogStore from "@/stores/applications/applicationsLogStore";
import { getTemplates } from "@/api/apifunctions/logs/logs";
import { App, searchParams } from "@/types/logs";
import { TextInput } from "@axa-fr/react-toolkit-form-input-text";

import "./search.scss";
import templateStore from "@/stores/logs/templateStore";
interface TemplateOption {
  id: number;
  template: string;
}
interface childComponentProps {
  onData: (data: searchParams) => void;
  initialData: searchParams | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export const SearchForm = React.forwardRef<
  HTMLFormElement,
  childComponentProps
>(({ initialData, onData, onSubmit }, ref: ForwardedRef<HTMLFormElement>) => {
  const [formData, setFormData] = useState({
    action: initialData?.action || "",
    requestId: initialData?.requestId || "",
    userName: initialData?.userName || "",
    portfolio: initialData?.portfolio || "",
    numContract: initialData?.numContract || "",
    app: initialData?.app || { applicationName: "", id: 0 },
    templateId: initialData?.templateId || null,
    isError: initialData?.isError || false,
    startDate: initialData?.startDate ? new Date(initialData.startDate) : null,
    endDate: initialData?.endDate ? new Date(initialData.endDate) : null,
  });
  const { actions, setActions } = actionStore();
  const { applications, setApplications } = applicationsLogStore();
  const { setTemplates, getTemplateById } = templateStore();
  const [queryTemplate, setQueryTemplate] = useState("");
  const [initialTemplate, setInitialTemplate] = useState<TemplateOption | null>(
    null
  );
  // Fetch actions
  useQuery("action", () => getActions(), {
    onSuccess({ successData }) {
      setActions(successData);
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
  // Fetch applications
  useQuery("application", () => getLogsApp(), {
    onSuccess({ successData }) {
      setApplications(successData);
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
  // Fetch templates by search input
  const { data: templatesData, isFetching } = useQuery(
    ["templates", queryTemplate],
    () => getTemplates(queryTemplate),
    {
      enabled: queryTemplate.length >= 2,
      refetchOnWindowFocus: false,
      onSuccess({ successData }) {
        setTemplates(successData); // Mise à jour du store Zustand
      },
    }
  );
  // Utilise Zustand pour récupérer le template initial par ID
  useEffect(() => {
    if (initialData?.templateId && !initialTemplate) {
      const found = getTemplateById(initialData.templateId);
      if (found) {
        setInitialTemplate(found);
      }
    }
  }, [initialData?.templateId, initialTemplate, getTemplateById]);
  const templateOptions: TemplateOption[] = templatesData?.successData || [];
  const allOptions = useMemo(() => {
    const map = new Map();
    (initialTemplate
      ? [initialTemplate, ...templateOptions]
      : templateOptions
    ).forEach((tpl) => map.set(tpl.id, tpl));
    return Array.from(map.values());
  }, [initialTemplate, templateOptions]);
  const selectedTemplateOption = allOptions.filter(
    (opt) => opt.id === formData.templateId
  );
  const excludeDateIntervals = useMemo(() => {
    const exclude = { start: [], end: [] } as {
      start: { start: Date; end: Date }[];
      end: { start: Date; end: Date }[];
    };
    if (formData.startDate) {
      const maxEndDate = new Date(formData.startDate);
      maxEndDate.setDate(maxEndDate.getDate() - 1);
      exclude.end.push({ start: new Date(0), end: maxEndDate });
    }
    const tomorrowBlock = { start: new Date(), end: new Date("9999-12-31") };
    exclude.start.push(tomorrowBlock);
    exclude.end.push(tomorrowBlock);
    return exclude;
  }, [formData.startDate]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onData(formData as any);
    onSubmit(e);
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedApp = applications.find(
      (app: App) => app.id === parseInt(e.target.value)
    );
    if (selectedApp) {
      setFormData({
        ...formData,
        app: { applicationName: selectedApp.appName, id: selectedApp.id },
      });
    }
  };
  return (
    <form onSubmit={handleSubmit} ref={ref}>
      <div className="form-content">
        <InputSelect
          id="select-action"
          name="action"
          classNameContainerLabel="col-md-3 p-2"
          classNameContainerInput="col-md-9 align-input"
          options={actions}
          label="Action"
          value={formData.action}
          placeHolderOption="Toutes"
          onChange={(e) => setFormData({ ...formData, action: e.target.value })}
        />
        <InputSelect
          id="select-logApp"
          name="logsApp"
          classNameContainerLabel="col-md-3 p-2"
          classNameContainerInput="col-md-9 align-input"
          options={applications}
          value={formData.app.id}
          placeHolderOption="Toutes"
          onChange={handleSelectChange}
          label="Application"
        />
        <div className="row align-input">
          <label className="col-md-3 p-2">Date </label>
          <div className="col-md-9 align-section-date">
            <span className="align-text-start-date"> du </span>
            <div>
              <CustomInputDate
                name="startDate"
                id="startDate"
                dateValue={formData.startDate}
                excludeDateIntervals={excludeDateIntervals.start}
                onChange={(date) =>
                  setFormData({ ...formData, startDate: date || null })
                }
              />
            </div>
            <span className="align-text"> au </span>
            <div>
              <CustomInputDate
                name="endDate"
                id="endDate"
                dateValue={formData.endDate}
                excludeDateIntervals={excludeDateIntervals.end}
                onChange={(date) =>
                  setFormData({ ...formData, endDate: date || null })
                }
              />
            </div>
          </div>
        </div>
        <TextInput
          id="input-reqID"
          data-testid="input-reqID"
          classModifier="form-control"
          key="reqID"
          name="reqID"
          classNameContainerLabel="col-md-3 p-2 "
          classNameContainerInput="col-md-9"
          value={formData.requestId}
          label="Request Id"
          onChange={(e) => setFormData({ ...formData, requestId: e.value })}
        />
        <TextInput
          id="input-username"
          data-testid="input-username"
          classModifier="form-control search-form"
          key="username"
          name="Username"
          classNameContainerLabel="col-md-3"
          classNameContainerInput="col-md-9"
          value={formData.userName}
          label="User"
          onChange={(e) => setFormData({ ...formData, userName: e.value })}
        />
        <TextInput
          id="input-portfolio"
          data-testid="input-portfolio"
          classModifier="form-control search-form"
          key="portfolio"
          name="portfolio"
          classNameContainerLabel="col-md-3"
          classNameContainerInput="col-md-9"
          value={formData.portfolio}
          label="Portfolio"
          onChange={(e) => setFormData({ ...formData, portfolio: e.value })}
        />
        <TextInput
          id="input-numContract"
          data-testid="input-numContract"
          classModifier="form-control search-form"
          key="numContract"
          name="numContract"
          classNameContainerLabel="col-md-3"
          classNameContainerInput="col-md-9"
          value={formData.numContract}
          label="N° de Contrat"
          onChange={(e) => setFormData({ ...formData, numContract: e.value })}
        />
        {/* Typeahead Template */}
        <div className="form-group row align-input">
          <label
            htmlFor="typeahead-template"
            className="col-md-3 col-form-label p-2"
          >
            Template
          </label>
          <div className="col-md-9">
            <Typeahead
              id="typeahead-template"
              labelKey="template"
              options={allOptions}
              placeholder="Choisir un template..."
              selected={selectedTemplateOption}
              onInputChange={(text) => {
                setQueryTemplate(text);
                if (text.length < 2) {
                  setFormData({ ...formData, templateId: 0 });
                }
              }}
              onChange={(selected) => {
                if (selected.length > 0) {
                  setFormData({
                    ...formData,
                    templateId: (selected[0] as TemplateOption).id,
                  });
                } else {
                  setFormData({ ...formData, templateId: 0 });
                }
              }}
              clearButton
              isLoading={isFetching}
              minLength={2}
              inputProps={{ name: "template" }}
            />
          </div>
        </div>
      </div>
      <CheckboxInput
        label="Afficher seulement les erreurs"
        checked={formData.isError}
        onChange={(e) =>
          setFormData({ ...formData, isError: e.target.checked })
        }
        name="isError"
        id="errorCheckbox"
      />
    </form>
  );
});
