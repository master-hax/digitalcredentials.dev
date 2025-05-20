import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>

      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={require('@site/static/img/P9P-Cocktails-Age21.png').default}
            alt="Screenshot of a Pixel 9 Pro with a Digital Credentials request visible asking for proof of age."
            style={{ width: '100%', maxWidth: '15em', height: 'auto' }}
          />
        </div>
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={"Home"}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
    </Layout>
  );
}