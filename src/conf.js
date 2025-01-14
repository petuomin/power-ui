/**
 * This file is part of power-ui, originally developed by Futurice Oy.
 *
 * power-ui is licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

/* global GLOBAL */
if (typeof GLOBAL !== 'undefined' && typeof GLOBAL['__DEV__'] === 'undefined') {
  GLOBAL['__DEV__'] = true;
}

const LOCAL_HOST = 'http://localhost:8000';
const PROD_HOST = 'https://power.futurice.com';

const LOCAL_API_PATH = `${LOCAL_HOST}/api/v1`;
const PROD_API_PATH = `${PROD_HOST}/api/v1`;

export default {
  API_PATH: __DEV__ ? LOCAL_API_PATH : PROD_API_PATH,
  HOST: __DEV__ ? LOCAL_HOST : PROD_HOST,
};
