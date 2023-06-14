export const providerMetadata = {
  name: 'YOUR_PROJECT_NAME',
  description: 'YOUR_PROJECT_DESCRIPTION',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
};

export const sessionParams = {
  namespaces: {
    eip155: {
      methods: [
        'eth_sendTransaction',
        'personal_sign'
      ],
      chains: ['eip155:137'],
      events: ['chainChanged', 'accountsChanged'],
      rpcMap: {},
    },
  },
};