import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/whitepaper">
            Read Whitepaper - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Documentation | ${siteConfig.title}`}
      description="Autonomous Narrative Intelligence & On-Chain Execution">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className={clsx('col col--4')}>
                <div className="text--center">
                  <img src="img/logo.svg" className={styles.featureSvg} alt="AI Core" />
                </div>
                <div className="text--center padding-horiz--md">
                  <h3>Intelligence Layer</h3>
                  <p>Synthesizing SoSoValue real-time news clusters and sector data into actionable alpha.</p>
                </div>
              </div>
              <div className={clsx('col col--4')}>
                <div className="text--center">
                   <img src="img/logo.svg" className={styles.featureSvg} alt="AI Core" />
                </div>
                <div className="text--center padding-horiz--md">
                  <h3>Agentic Engine</h3>
                  <p>Powered by Gemini 1.5 Flash for deep narrative extraction and strategic reasoning.</p>
                </div>
              </div>
              <div className={clsx('col col--4')}>
                <div className="text--center">
                   <img src="img/logo.svg" className={styles.featureSvg} alt="AI Core" />
                </div>
                <div className="text--center padding-horiz--md">
                  <h3>On-Chain Forge</h3>
                  <p>Direct integration with SSI Protocol and ValueChain L1 for permissionless execution.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
