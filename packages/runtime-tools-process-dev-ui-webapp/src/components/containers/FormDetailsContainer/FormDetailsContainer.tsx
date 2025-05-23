/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useMemo } from "react";
import { FormInfo, FormContent } from "@kie-tools/runtime-tools-shared-gateway-api/dist/types";
import {
  EmbeddedFormDetails,
  FormDetailsChannelApi,
} from "@kie-tools/runtime-tools-process-enveloped-components/dist/formDetails";
import { useFormDetailsChannelApi } from "../../../channel/FormDetails";

interface FormDetailsContainerProps {
  formData: FormInfo;
  onSuccess: () => void;
  onError: (details?: string) => void;
  targetOrigin: string;
}
const FormDetailsContainer: React.FC<FormDetailsContainerProps> = ({ formData, onSuccess, onError, targetOrigin }) => {
  const channelApi = useFormDetailsChannelApi();

  const extendedChannelApi: FormDetailsChannelApi = useMemo(
    () => ({
      formDetails__getFormContent: function (formName: string) {
        return channelApi.formDetails__getFormContent(formName);
      },
      formDetails__saveFormContent(formName: string, formContent: FormContent) {
        return channelApi
          .formDetails__saveFormContent(formName, formContent)
          .then(() => onSuccess())
          .catch((error) => {
            const message = error.response ? error.response.data : error.message;
            onError(message);
          });
      },
    }),
    [channelApi, onError, onSuccess]
  );

  return <EmbeddedFormDetails channelApi={extendedChannelApi} targetOrigin={targetOrigin} formData={formData} />;
};

export default FormDetailsContainer;
