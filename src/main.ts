     <Typeahead
     id="city-autocomplete"
     labelKey="name"
     options={options}
     placeholder="Choisir une ville..."
     onChange={(selected) => console.log(selected)}
   /> je veux ajouter typehead a la place de template 

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CheckboxInput,
  CustomInputDate,
  InputSelect,
} from "@/components/atoms";
import actionStore from "@/stores/actions/actionsStore";
import { getActions } from "@/api/apifunctions/action/actions";
import { App, searchParams } from "@/types/logs";
import { TextInput } from "@axa-fr/react-toolkit-form-input-text";
import "./search.scss";
import React, { ChangeEvent, ForwardedRef, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getLogsApp } from "@/api/apifunctions/application/application";
import applicationsLogStore from "@/stores/applications/applicationsLogStore";
import { Typeahead } from "react-bootstrap-typeahead";

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
    template: initialData?.template || "",
    isError: initialData?.isError || false,
    startDate: initialData?.startDate ? new Date(initialData.startDate) : null,
    endDate: initialData?.endDate ? new Date(initialData.endDate) : null,
  });
  const { actions, setActions } = actionStore();
  const { applications, setApplications } = applicationsLogStore();
  useQuery("action", () => getActions(), {
    onSuccess({ successData }) {
      setActions(successData);
    },
    onError: () => {},
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
  useQuery("application", () => getLogsApp(), {
    onSuccess({ successData }) {
      setApplications(successData);
    },
    onError: () => {},
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
  const excludeDateIntervals = useMemo(() => {
    const exclude: {
      start: { start: Date; end: Date }[];
      end: { start: Date; end: Date }[];
    } = {
      start: [],
      end: [],
    };
    if (formData?.startDate) {
      const maxEndDate = new Date(formData?.startDate);
      maxEndDate.setDate(maxEndDate.getDate() - 1);
      exclude.end.push({ start: new Date(0), end: maxEndDate });
    }
    const tomorrowBlock = { start: new Date(), end: new Date("9999-12-31") };
    exclude.start.push(tomorrowBlock);
    exclude.end.push(tomorrowBlock);

    return exclude;
  }, [formData?.startDate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onData(formData as any);
    onSubmit(e);
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedApp = applications.find(
      (applications: App) => applications.id === parseInt(e.target.value)
    );
    setFormData({
      ...formData,
      app: { applicationName: selectedApp.appName, id: selectedApp.id },
    });
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
          classNameContainerLabel="col-md-3 p-2 "
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
                onChange={(date: Date | null) => {
                  setFormData({
                    ...formData,
                    startDate: date ? date : null,
                  });
                }}
              />
            </div>
            <span className="align-text"> au </span>
            <div>
              <CustomInputDate
                name="endDate"
                id="endDate"
                dateValue={formData.endDate}
                excludeDateIntervals={excludeDateIntervals.end}
                onChange={(date: Date | null) => {
                  setFormData({
                    ...formData,
                    endDate: date ? date : null,
                  });
                }}
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
        <TextInput
          id="input-template"
          data-testid="input-template"
          classModifier="form-control search-form"
          key="template"
          name="template"
          classNameContainerLabel="col-md-3"
          classNameContainerInput="col-md-9"
          value={formData.template}
          label="Template"
          onChange={(e) => setFormData({ ...formData, template: e.value })}
        />
      </div>
      <CheckboxInput
        label="Afficher seulement les erreurs"
        checked={formData.isError}
        onChange={(e) =>
          setFormData({ ...formData, isError: e.target.checked })
        }
        name="isError"
      />
    </form>
  );
});
