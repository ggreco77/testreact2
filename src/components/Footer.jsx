import React from "react";
import "./Footer.css";

export default function Footer({
  version = "v0.1.0",
  repoUrl = "https://github.com/your-org/your-repo",
  email = "giuseppe.greco@pg.infn.it",
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="ft-inner">
        <div className="ft-block">
          <span className="ft-label">Versione</span>
          <strong className="ft-value">{version}</strong>
        </div>

        <div className="ft-block">
          <span className="ft-label">Doctor Tensor</span>
          <span className="ft-value">
            Versione sperimentale in fase di test {" "}
          </span>
        </div>

        <div className="ft-block">
          <span className="ft-label">Contatti</span>
          <a href={`mailto:${email}`} className="ft-value ft-link">
            {email}
          </a>
        </div>
      </div>

      <div className="ft-bottom">
        <span>© {year} Doctor Tensor</span>
      </div>
    </footer>
  );
}
