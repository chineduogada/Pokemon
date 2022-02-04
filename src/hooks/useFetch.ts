import { useState, useCallback, Dispatch, SetStateAction } from "react";

type HandleFetchResourceProps<ResourceData> = {
  fetcher: () => Promise<ResourceData>;
  onSuccess?: (resource: ResourceData) => void;
  onError?: (error: Error) => void;
};

export type Resource<ResourceData> = {
  data?: ResourceData;
  loading?: boolean;
  error?: string;
};

type ReturnValue<ResourceData> = {
  resource: Resource<ResourceData>;
  setResource: Dispatch<SetStateAction<Resource<ResourceData>>>;
  handleFetchResource: ({
    fetcher,
    onSuccess,
    onError
  }: HandleFetchResourceProps<ResourceData>) => Promise<() => void>;
  handleClearResource: () => void;
};

export function useFetch<ResourceData>(): ReturnValue<ResourceData> {
  const [resource, setResource] = useState<Resource<ResourceData>>({
    data: undefined,
    loading: false,
    error: undefined
  });

  const handleFetchResource = useCallback(
    async ({
      fetcher,
      onSuccess,
      onError
    }: HandleFetchResourceProps<ResourceData>) => {
      let componentIsMount = true;
      setResource((prev) => ({ ...prev, loading: true, error: undefined }));

      try {
        const resource = await fetcher();
        onSuccess?.(resource);

        if (componentIsMount)
          setResource((prev) => ({ ...prev, data: resource, loading: false }));
      } catch (err) {
        const { message } = err as Error;

        console.error(err);
        onError?.(err as Error);
        if (componentIsMount)
          setResource((prev) => ({ ...prev, error: message, loading: false }));
      }

      return () => {
        componentIsMount = false;
      };
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClearResource = () =>
    setResource((prev) => ({ ...prev, data: undefined }));

  return {
    resource,
    setResource,
    handleFetchResource,
    handleClearResource
  };
}
