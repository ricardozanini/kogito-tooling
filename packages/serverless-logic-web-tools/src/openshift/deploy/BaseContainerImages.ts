/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const DeployDefaults = {
  ENV: 'MAVEN_OPTS="-Xmx2g -Xms1g" JAVA_OPTS="-Xmx2g -Xms1g"',
};

// Refers to `serverless-logic-web-tools-swf-builder-image`
export const SwfBuilder = {
  CONTAINER_IMAGE: process.env.WEBPACK_REPLACE__swfBuilderImageFullUrl!,
  ENV: DeployDefaults.ENV,
  PROJECT_FOLDER: `/home/kogito/serverless-workflow-project`,
};

// Refers to `serverless-logic-web-tools-base-builder-image`
export const BaseBuilder = {
  CONTAINER_IMAGE: process.env.WEBPACK_REPLACE__baseBuilderImageFullUrl!,
  ENV: DeployDefaults.ENV,
  PROJECT_FOLDER: `/home/kogito/serverless-workflow-project`,
  KUBECTL_PATH: "/home/kogito/kubectl",
};

// Refers to `dashbuilder-viewer-image`
export const DashbuilderViewer = {
  CONTAINER_IMAGE: process.env.WEBPACK_REPLACE__dashbuilderViewerImageFullUrl!,
  HTTPD_OUT: "/var/www/html",
  APP_DATA_FILE: "dashbuilder-viewer-deployment-webapp-data.json",
};

// Refers to `serverless-logic-web-tools-swf-dev-mode-image`
export const SwfDevMode = {
  CONTAINER_IMAGE: process.env.WEBPACK_REPLACE__devModeImageFullUrl!,
};
