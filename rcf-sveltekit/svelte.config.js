import adapter from '@sveltejs/adapter-node';

const config = {
  kit: {
    adapter: adapter({ strict: false }),
    prerender: { entries: ['*'] }
  }
};

export default config;
