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
import {Rx} from '@cycle/core';
import {replicateStream} from 'power-ui/utils';
import MonthSelector from 'power-ui/components/widgets/MonthSelector/index';
import PowerheadPageHTTP from './http';
import {model, filterState} from './model';
import view from './view';
import {LocationFilterWrapper} from 'power-ui/components/pages/common/filter-wrappers';

function MonthSelectorWrapper(DOM, state$) {
  const props$ = state$.map(state => ({length: 1 + state.lookaheadLength}));
  return MonthSelector({DOM, props$});
}

function PowerheadPage(sources) {
  const proxyState$ = new Rx.ReplaySubject(1);
  const powerheadPageHTTP = PowerheadPageHTTP({HTTP: sources.HTTP, props$: proxyState$});
  const state$ = model(powerheadPageHTTP.response$, sources.props$);
  const locationFilter = LocationFilterWrapper(state$, sources.DOM);
  const monthSelector = MonthSelectorWrapper(sources.DOM, state$);
  const filteredState$ = filterState(state$,
    monthSelector.value$, locationFilter.value$
  );
  const vtree$ = view(filteredState$, monthSelector.DOM, locationFilter.DOM);
  const localStorageSink$ = locationFilter.value$.map(location => ({location}));
  replicateStream(state$, proxyState$);

  const sinks = {
    DOM: vtree$,
    HTTP: powerheadPageHTTP.request$,
    LocalStorage: localStorageSink$,
  };
  return sinks;
}

export default PowerheadPage;
