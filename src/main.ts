/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, ForwardedRef, useMemo, useState } from "react";
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

import { App, searchParams } from "@/types/logs";
import { TextInput } from "@axa-fr/react-toolkit-form-input-text";
import "./search.scss";
import { getTemplates } from "@/api/apifunctions/logs/logs";
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
    template: initialData?.template || null, // stocker uniquement l'id du template ici
    isError: initialData?.isError || false,
    startDate: initialData?.startDate ? new Date(initialData.startDate) : null,
    endDate: initialData?.endDate ? new Date(initialData.endDate) : null,
  });
  const { actions, setActions } = actionStore();
  const { applications, setApplications } = applicationsLogStore();
  // Récupération des actions
  useQuery("action", () => getActions(), {
    onSuccess({ successData }) {
      setActions(successData);
    },
    onError: () => {},
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
  // Récupération des applications
  useQuery("application", () => getLogsApp(), {
    onSuccess({ successData }) {
      setApplications(successData);
    },
    onError: () => {},
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
  // State pour gérer la saisie du template (recherche)
  const [queryTemplate, setQueryTemplate] = useState("");
  const { data: templatesData, isFetching } = useQuery(
    ["templates", queryTemplate],
    () => getTemplates(queryTemplate),
    {
      enabled: queryTemplate.length >= 2,
      refetchOnWindowFocus: false,
    }
  );
  const templateOptions: TemplateOption[] = templatesData?.successData || [];
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
  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onData(formData as any);
    onSubmit(e);
  };
  // Gestion changement de select application
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedApp = applications.find(
      (applications: App) => applications.id === parseInt(e.target.value)
    );
    if (selectedApp) {
      setFormData({
        ...formData,
        app: { applicationName: selectedApp.appName, id: selectedApp.id },
      });
    }
  };
  // Pour afficher dans le Typeahead l'option sélectionnée à partir de l'id
  const selectedTemplateOption = templateOptions.filter(
    (opt) => opt.id === formData.template
  );
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
                onChange={(date: Date | null) =>
                  setFormData({ ...formData, startDate: date ? date : null })
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
                onChange={(date: Date | null) =>
                  setFormData({ ...formData, endDate: date ? date : null })
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
        {/* Remplacement du TextInput template par Typeahead */}
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
              options={templateOptions}
              placeholder="Choisir un template..."
              selected={selectedTemplateOption}
              onInputChange={(text) => {
                setQueryTemplate(text);
                if (text.length < 2) {
                  setFormData({ ...formData, template: 0 });
                }
              }}
              onChange={(selected) => {
                if (selected.length > 0) {
                  setFormData({
                    ...formData,
                    template: (selected[0] as TemplateOption).id,
                  });
                } else {
                  setFormData({ ...formData, template: 0 });
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


import { useQuery, useQueryClient } from "react-query";
import { useState, useMemo, useRef } from "react";
import Loader from "@axa-fr/react-toolkit-loader";
import { Alert } from "@axa-fr/react-toolkit-all";
import { LogsTable } from "./logsTable";
import logStore from "@/stores/logs/logsStore";
import {
  findLogs,
  getLogs,
  massReplay,
  replay,
} from "@/api/apifunctions/logs/logs";
import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/pagination/usePagination";
import { Button } from "@/components/atoms/index";
import CustomModal from "@/components/modals/customModal";
import { defColumnsLogs } from "@/constants/columns";
import { ILog, searchParams } from "@/types/logs";
import useSort from "@/components/SortButton/useSort";

import ExpandedLogRow from "@/pages/logs/logsTable/ExpandedLogRow";
import { Replay } from "./Replay";
import useGenericMutation from "@/hooks/mutation/useGenericMutation";
import { renderActions } from "@/components/renderActions";
import { useLogicModal } from "@/hooks/logicModal/useLogicModal";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { SearchForm } from "./Search";
export const LogsList = () => {
  const sort = useSort();
  const { setPagination, getSearchParams } = usePagination();
  const { numberItems, page } = getSearchParams();
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const [logID, setLogID] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useState<searchParams | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { sortBy, sortDirection } = sort;
  const [errors, setErrors] = useState<string[]>([]);
  const { logs, setLogs } = logStore();
  const [replayData, setReplayData] = useState<string>("");
  const { openModal, closeModal, isModalOpen, modalMode } =
    useLogicModal<ILog>();
  const logsFilters = useMemo(
    () => ({
      page: page - 1,
      size: numberItems,
      order: sortDirection,
      sortBy: sortBy || "id",
    }),
    [page, numberItems, sortDirection, sortBy]
  );
  const queryClient = useQueryClient();
  const handleError = (message: string) => {
    setErrors([message]);
  };
  const { isFetching } = useQuery(
    ["logs", logsFilters],
    () => getLogs(logsFilters),
    {
      onSuccess: ({ successData }) => {
        setLogs(successData);
      },
      onError: () => {
        handleError(
          "Une erreur s'est produite lors de la récupération de la liste des logs"
        );
      },
      enabled: !searchParams,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  console.log("debug", searchParams, logsFilters);
  const dataSearch = useQuery(
    ["logs_search", searchParams, logsFilters],
    () => findLogs(searchParams, logsFilters),
    {
      onSuccess: ({ successData }) => {
        setLogs(successData);
        closeModal();
      },
      onError: () => {
        handleError("Une erreur s'est produite lors de la recherche des logs");
      },
      enabled: !!searchParams,
      refetchOnWindowFocus: false,
    }
  );
  const handleRenderAction = (log: ILog) => {
    return log.action === "GENERATE"
      ? renderActions({
          showReplay: true,
          onReplay: () => {
            setLogID(log.id);
            openModal("replay", log);
          },
        })
      : null;
  };

  const { mutate: massReplayMutate, isLoading: loadingMassReplay } =
    useGenericMutation(
      massReplay,
      "Rejeu en masse réussi !",
      "Erreur lors du rejeu en masse !",
      () => {
        // Rafraîchir la liste des logs après le replay
        if (searchParams) {
          queryClient.invalidateQueries("logs_search");
        } else {
          queryClient.invalidateQueries("logs");
        }
        setSelectedRowIds([]);
        closeModal();
      }
    );
  const { mutate: replayMutate, isLoading: loadingReplay } = useGenericMutation(
    replay,
    "Rejouer avec succès !",
    "Erreur lors du rejeu !",
    () => {
      setLogs({
        totalPages: 0,
        size: 0,
        totalElements: 0,
        content: [],
        currentPage: 0,
        isLast: false,
      });
      if (searchParams) {
        queryClient.invalidateQueries("logs_search");
      } else {
        queryClient.invalidateQueries("logs");
      }

      closeModal();
    }
  );
  const handleSubmitReplay = () => {
    replayMutate(replayData);
  };

  const handleDataSearch = (data: searchParams) => {
    handlePageChange(1);
    setSearchParams(data);
    closeModal();
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handlePageChange = (newPage: number) =>
    setPagination({ page: newPage });

  const handleNumPerPageChange = (numPerPage: number) =>
    setPagination({ numberItems: numPerPage, page: 1 });

  const handleSelectedRows = (rows: number[]) => {
    setSelectedRowIds(rows);
  };
  const handleMassReplay = () => {
    if (selectedRowIds.length > 0) {
      openModal("massReplay");
    }
  };
  return (
    <div className="mt-3">
      {errors.length ? (
        errors.map((error: string, index: number) => (
          <Alert key={index} classModifier="error" title={error}></Alert>
        ))
      ) : (
        <div>
          <div className="row g-2 mb-2">
            <div className="col-auto ">
              <Button onClick={() => openModal("rechercher")}>
                <span className="af-btn__text">Recherche</span>
              </Button>
            </div>
            <div className="col-auto">
              {selectedRowIds.length > 0 && (
                <Button onClick={handleMassReplay} disabled={loadingMassReplay}>
                  <span className="af-btn__text">Replay</span>
                </Button>
              )}
            </div>
          </div>
          <Loader
            mode={isFetching || dataSearch.isFetching ? "get" : "none"}
            className="af-loader"
            text=""
          >
            {!isFetching ? (
              logs?.content && logs?.content.length > 0 ? (
                <LogsTable
                  columns={defColumnsLogs}
                  items={logs?.content || []}
                  renderExpandedRow={(item) => <ExpandedLogRow item={item} />}
                  renderActions={(item) => handleRenderAction(item)}
                  onSelectedRows={handleSelectedRows}
                />
              ) : (
                <Alert classModifier="info" title="Aucune log(s) trouvée." />
              )
            ) : null}
          </Loader>
          {logs?.totalPages > 1 && (
            <div className="pagination-wrapper mb-1">
              <Pagination
                page={page}
                pagesCount={logs?.totalPages}
                numPerPage={numberItems}
                onPageChange={handlePageChange}
                onNumberItemsChange={handleNumPerPageChange}
              />
            </div>
          )}
        </div>
      )}
      <CustomModal
        title={"Recherche"}
        isOpen={isModalOpen && modalMode === "rechercher"}
        onClose={closeModal}
        onCancel={() => {
          setSearchParams(null);
          closeModal();
        }}
        cancelTitle="Rénitialiser"
        onSubmit={() => formRef.current?.requestSubmit()}
        submitTitle={"Rechercher"}
        dataTestid="modal-search"
        isForm={true}
      >
        <SearchForm
          ref={formRef}
          onSubmit={handleSubmit}
          onData={handleDataSearch}
          initialData={searchParams}
        />
      </CustomModal>
      <Replay
        id={logID}
        isOpen={isModalOpen && modalMode === "replay"}
        onClose={closeModal}
        onChangeValueReplay={setReplayData}
        isLoading={loadingReplay}
        onSubmit={handleSubmitReplay}
      />

      <ConfirmationModal
        item={selectedRowIds}
        isOpen={isModalOpen && modalMode === "massReplay"}
        onClose={closeModal}
        actionFn={() => massReplayMutate(selectedRowIds)}
        itemIdExtractor={(item) => item[0]}
        itemNameExtractor={() => "logs sélectionnés"}
        message="Êtes-vous sûr de vouloir rejouer les logs sélectionnés ?"
        submitTitle="Oui, Rejouer"
        cancelTitle="Annuler"
        isError={false}
        isLoading={loadingMassReplay}
      />
    </div>
  );
};
 
