import React from 'react';
import { siteContent } from '../../../moocks/content';
import './styles.css';

const MentesFortes: React.FC = () => {
  const { mentesFortes, global } = siteContent;

  return (
    <div className="page-fade-in mentes-editorial page-top-padding" aria-labelledby="mentes-title">
      <div className="container">
        <div className="mentes-header-focus">
          <span className="pre-title">Projeto Educacional</span>
          <h1 id="mentes-title">{mentesFortes.title}</h1>
          <h2>{mentesFortes.subtitle}</h2>
        </div>

        <div className="mentes-intro-text text-center">
          <p className="large-p"><strong>{mentesFortes.intro.strong}</strong></p>
          <p>{mentesFortes.intro.text}</p>
          <h3 className="italic-question">{mentesFortes.intro.question}</h3>
          <p className="answer-p">
            {mentesFortes.intro.answerPrefix}
            <span className="accent-text">{mentesFortes.intro.answerStrong}</span>
          </p>
        </div>

        <div className="editorial-line"></div>

        <div className="mentes-columns">
          <div className="mente-col">
            <h3 className="small-heading">{mentesFortes.whatIs.title}</h3>
            <p>{mentesFortes.whatIs.desc}</p>
            <ul className="text-list">
              {mentesFortes.whatIs.items.map((item, idx) => (
                <li key={idx}><strong>{item.strong}</strong> {item.text}</li>
              ))}
            </ul>
          </div>

          <div className="mente-col">
            <h3 className="small-heading">{mentesFortes.transformation.title}</h3>
            <p>{mentesFortes.transformation.desc}</p>
            <p className="emphasis-subtitle">{mentesFortes.transformation.subtitle}</p>
            <ul className="text-list">
              {mentesFortes.transformation.items.map((item, idx) => (
                <li key={idx}><strong>{item.strong}</strong> {item.text}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mentes-action-box">
          <div className="action-content">
            <h3 className="small-heading">{mentesFortes.targetAudience.title}</h3>
            <p>{mentesFortes.targetAudience.text}</p>
            <p className="mb-4"><strong>{mentesFortes.targetAudience.strong}</strong></p>
            
            <a href={`mailto:${global.email}`} className="btn-editorial">
              Solicitar Palestra
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentesFortes;