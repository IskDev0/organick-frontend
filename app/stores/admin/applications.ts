import type {
  IApplication,
  IApplicationsList,
} from "~/types/admin/IApplication";
import type { IPagination } from "~/types/IPagination";

export const useApplicationsStore = defineStore("applications", () => {
  const { $apiClient } = useNuxtApp();

  const applications = ref<IApplication[]>([]);
  const applicationsPaginationInfo = ref<IPagination>();
  const applicationsFilters = ref({
    search: "",
    status: "",
    date: "",
  })

  const getApplications = async (): Promise<void> => {

    let params = new URLSearchParams();
    Object.entries(applicationsFilters.value).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    try {
      const { data, pagination } =
        await $apiClient<IApplicationsList>(`/applications?${params.toString()}`);
      applications.value = data;
      applicationsPaginationInfo.value = pagination;
    } catch (error) {
      console.log(error);
    }
  };

  const createApplication = async (
    application: IApplication,
  ): Promise<void> => {
    try {
      await $apiClient("/applications", {
        method: "POST",
        body: application,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateApplicationStatus = async (
    id: string,
    status: string,
  ): Promise<void> => {
    try {
      await $apiClient(`/applications/${id}`, {
        method: "PATCH",
        body: { status },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteApplication = async (id: string): Promise<void> => {
    try {
      await $apiClient(`/applications/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    applications,
    applicationsPaginationInfo,
    applicationsFilters,
    getApplications,
    createApplication,
    updateApplicationStatus,
    deleteApplication,
  };
});
