import React from 'react';
import { siteContent } from '../../../moocks/content';
import './styles.css';

const Hypnotherapy: React.FC = () => {
  const { hypnotherapy } = siteContent;

  return (
    <div className="page-fade-in hypno-editorial page-top-padding" aria-labelledby="hypno-title">
      <div className="container">
        <div className="hypno-grid">
          <div className="hypno-intro">
            <h1 id="hypno-title">{hypnotherapy.title}</h1>
            <h2 className="hypno-sub">{hypnotherapy.subtitle}</h2>
            <p className="hypno-lead">{hypnotherapy.intro}</p>
          </div>
          
          <div className="hypno-details">
            <div className="detail-group">
              <h3 className="gold-heading">{hypnotherapy.howItWorks.title}</h3>
              <p>{hypnotherapy.howItWorks.desc}</p>
              <ul className="gold-list">
                {hypnotherapy.howItWorks.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="editorial-line-dark"></div>

            <div className="detail-group">
              <h3 className="gold-heading">{hypnotherapy.validation.title}</h3>
              {hypnotherapy.validation.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)}
              <blockquote className="editorial-quote">
                {hypnotherapy.validation.strong}
              </blockquote>
            </div>
          </div>
        </div>

        <div className="hypno-bottom-grid">
          <div className="conditions-block">
            <h3 className="gold-heading">{hypnotherapy.conditions.title}</h3>
            <div className="text-columns">
              <ul className="clean-list">
                {hypnotherapy.conditions.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="important-block">
            <h3 className="gold-heading">{hypnotherapy.important.title}</h3>
            {hypnotherapy.important.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)}
            
            <div className="stats-box">
              {hypnotherapy.important.details.map((detail, idx) => (
                <div key={idx} className="stat-item">
                  <span className="stat-label">{detail.strong}</span>
                  <span className="stat-value">{detail.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hypnotherapy;