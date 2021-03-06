/**********************************************************************
 * Copyright (c) 2018-2020 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ***********************************************************************/

import { CheProduct, PLUGIN_RPC_CONTEXT, Product } from '../common/che-protocol';
import { LinkMap, Logo, Welcome } from '@eclipse-che/plugin';

import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';

export class CheProductImpl implements CheProduct {
  private product: Product = {
    icon: '',
    logo: '',
    name: '',
    welcome: undefined,
    links: {},
  };

  constructor(rpc: RPCProtocol) {
    const productMain = rpc.getProxy(PLUGIN_RPC_CONTEXT.CHE_PRODUCT_MAIN);
    productMain.$getProduct().then((product: Product) => {
      this.product = product;
    });
  }

  getIcon(): string {
    return this.product.icon;
  }

  getLogo(): string | Logo {
    return this.product.logo;
  }

  getName(): string {
    return this.product.name;
  }

  getWelcome(): Welcome | undefined {
    return this.product.welcome;
  }

  getLinks(): LinkMap {
    return this.product.links;
  }
}
