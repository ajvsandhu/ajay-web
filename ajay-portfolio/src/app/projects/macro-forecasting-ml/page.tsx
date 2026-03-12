"use client";

import { ParticleBackground } from "@/components/ui/particle-background";
import { BubbleNav } from "@/components/ui/bubble-nav";
import { Footer } from "@/components/ui/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";

const REPO_URL = "https://github.com/ajvsandhu/macro-forecasting-ml-canada";
const REPORT_URL = "https://github.com/ajvsandhu/macro-forecasting-ml-canada/blob/main/report.md";

const RESULTS_TABLE = [
  { model: "Persistence", rmse: "0.233", mae: "0.156", mape: "2.71" },
  { model: "Ridge", rmse: "0.245", mae: "0.201", mape: "3.57" },
  { model: "ARIMA", rmse: "0.338", mae: "0.236", mape: "4.26" },
  { model: "VAR", rmse: "0.455", mae: "0.364", mape: "6.56" },
  { model: "Random Forest", rmse: "0.476", mae: "0.391", mape: "7.32" },
  { model: "XGBoost", rmse: "0.479", mae: "0.421", mape: "7.66" },
  { model: "Historical Mean", rmse: "1.645", mae: "1.531", mape: "28.38" },
];

const SCENARIO_TABLE = [
  { scenario: "Rate cut -200bp", rateChange: "−2.0 pp", newRate: "1.43", m1: "7.40", m6: "7.45", m12: "7.44" },
  { scenario: "Rate cut -100bp", rateChange: "−1.0 pp", newRate: "2.43", m1: "7.00", m6: "7.03", m12: "7.02" },
  { scenario: "Status quo", rateChange: "0.0 pp", newRate: "3.43", m1: "6.60", m6: "6.60", m12: "6.60" },
  { scenario: "Rate hike +100bp", rateChange: "+1.0 pp", newRate: "4.43", m1: "6.20", m6: "6.17", m12: "6.18" },
  { scenario: "Rate hike +200bp", rateChange: "+2.0 pp", newRate: "5.43", m1: "5.79", m6: "5.74", m12: "5.75" },
];

export default function MacroForecastingMLPage() {
  return (
    <>
      <ParticleBackground />
      <BubbleNav />
      <div className="min-h-screen relative">
        <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm pixel-text mb-8 hover:underline"
              style={{ color: "var(--pixel-light-gray)" }}
            >
              <ArrowLeft size={18} />
              BACK TO PORTFOLIO
            </Link>

            <ScrollReveal direction="up">
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold pixel-text mb-4 pixel-glow"
                style={{ color: "var(--accent-primary)" }}
              >
                Canadian Unemployment Forecasting (Macro ML)
              </h1>
              <p
                className="text-base lg:text-lg pixel-text mb-8 leading-relaxed"
                style={{ color: "var(--pixel-light-gray)" }}
              >
                Forecasting Canadian unemployment using macroeconomic indicators (StatCan, Bank of Canada, FRED) and exploring how monetary policy influences short-term labor market dynamics.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded border-2 pixel-text text-sm font-medium transition-colors hover:opacity-90"
                  style={{
                    borderColor: "var(--accent-primary)",
                    color: "var(--accent-primary)",
                    background: "rgba(116, 192, 252, 0.1)",
                  }}
                >
                  <ExternalLink size={18} />
                  VIEW ON GITHUB
                </a>
                <a
                  href={REPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded border-2 pixel-text text-sm font-medium transition-colors hover:opacity-90"
                  style={{
                    borderColor: "var(--accent-secondary)",
                    color: "var(--accent-secondary)",
                    background: "rgba(148, 211, 162, 0.1)",
                  }}
                >
                  <ExternalLink size={18} />
                  FULL REPORT (REPORT.MD)
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Overview */}
            <ScrollReveal direction="up">
              <h2
                className="text-xl sm:text-2xl font-bold pixel-text mb-6"
                style={{ color: "var(--pixel-white)" }}
              >
                OVERVIEW
              </h2>
              <div className="space-y-4 pixel-text text-sm leading-relaxed" style={{ color: "var(--pixel-light-gray)" }}>
                <p>
                  <strong style={{ color: "var(--pixel-white)" }}>Research question:</strong> Can Canadian unemployment be reliably forecast using macroeconomic indicators, and how does monetary policy influence short-term labor market dynamics?
                </p>
                <p>
                  Using monthly data from 2009 to 2024 (177 months after preprocessing), I built seven forecasting models: baselines (Persistence, Historical Mean), statistical (ARIMA, VAR), and machine learning (Random Forest, XGBoost, Ridge). <strong style={{ color: "var(--accent-secondary)" }}>Main result:</strong> Persistence and Ridge achieve the best performance (RMSE ~0.23–0.24, MAPE ~2.7–3.6%). A scenario simulation with a Ridge model trained without the unemployment lag shows that rate cuts are associated with higher predicted unemployment over 12 months, and rate hikes with lower—consistent with delayed monetary policy transmission.
                </p>
              </div>
            </ScrollReveal>

            {/* Data and methods */}
            <ScrollReveal direction="up">
              <h2
                className="text-xl sm:text-2xl font-bold pixel-text mb-6"
                style={{ color: "var(--pixel-white)" }}
              >
                DATA & METHODS
              </h2>
              <div className="space-y-4 pixel-text text-sm leading-relaxed" style={{ color: "var(--pixel-light-gray)" }}>
                <p>
                  <strong style={{ color: "var(--pixel-white)" }}>Data sources:</strong> Statistics Canada (unemployment, employment, CPI, GDP), Bank of Canada (overnight rate, 10-year bond yield), FRED (CAD/USD exchange rate, WTI oil price). Target variable: seasonally adjusted monthly unemployment rate.
                </p>
                <p>
                  <strong style={{ color: "var(--pixel-white)" }}>Train/test:</strong> Chronological 80/20 split—train 2010-04 to 2021-12 (141 months), test 2022-01 to 2024-12 (36 months). Features include levels, lags, changes, and rolling measures; two leaky features (unemp_change_1m, unemp_rolling_12m) were excluded.
                </p>
                <p>
                  <strong style={{ color: "var(--pixel-white)" }}>Models:</strong> Persistence (next month = this month), Historical Mean, ARIMA(1,0,2), VAR(2), Random Forest, XGBoost, Ridge (alpha=1, standardized features). For scenario simulation, a separate Ridge model was trained without unemp_lag_1m to isolate macro→unemployment links under hypothetical BoC rate paths.
                </p>
                <div className="mt-4 rounded-lg overflow-hidden border" style={{ borderColor: "var(--accent-primary)" }}>
                  <img
                    src="/projects/macro-ml/correlation_matrix.png"
                    alt="Correlation matrix between macroeconomic variables"
                    className="w-full h-auto object-contain"
                    style={{ background: "var(--pixel-dark-blue)", minHeight: "200px" }}
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Results */}
            <ScrollReveal direction="up">
              <h2
                className="text-xl sm:text-2xl font-bold pixel-text mb-6"
                style={{ color: "var(--pixel-white)" }}
              >
                RESULTS
              </h2>
              <p className="pixel-text text-sm mb-6 leading-relaxed" style={{ color: "var(--pixel-light-gray)" }}>
                Persistence and Ridge outperform all other models. Historical Mean is by far the worst (RMSE 1.65). Complex ML (VAR, Random Forest, XGBoost) does not improve on the simpler approaches at this 1-month horizon.
              </p>
              <div className="overflow-x-auto rounded-lg border mb-10" style={{ borderColor: "var(--accent-primary)" }}>
                <table className="w-full pixel-text text-sm">
                  <thead>
                    <tr style={{ background: "rgba(116, 192, 252, 0.15)", color: "var(--pixel-white)" }}>
                      <th className="text-left p-3">Model</th>
                      <th className="text-right p-3">RMSE</th>
                      <th className="text-right p-3">MAE</th>
                      <th className="text-right p-3">MAPE (%)</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "var(--pixel-light-gray)" }}>
                    {RESULTS_TABLE.map((row) => (
                      <tr key={row.model} style={{ borderTop: "1px solid var(--accent-primary)" }}>
                        <td className="p-3">{row.model}</td>
                        <td className="text-right p-3">{row.rmse}</td>
                        <td className="text-right p-3">{row.mae}</td>
                        <td className="text-right p-3">{row.mape}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mb-8 rounded-lg overflow-hidden border" style={{ borderColor: "var(--accent-primary)" }}>
                <img
                  src="/projects/macro-ml/model_comparison_bar.png"
                  alt="Model performance comparison (RMSE, MAE, MAPE)"
                  className="w-full h-auto object-contain"
                  style={{ background: "var(--pixel-dark-blue)", minHeight: "200px" }}
                />
              </div>

              <h3 className="text-lg font-semibold pixel-text mb-4" style={{ color: "var(--accent-secondary)" }}>
                Scenario simulation (12-month horizon)
              </h3>
              <p className="pixel-text text-sm mb-4 leading-relaxed" style={{ color: "var(--pixel-light-gray)" }}>
                Predicted unemployment under five BoC rate scenarios (Ridge without unemp_lag_1m). This step lets us ask how unemployment would change if the Bank of Canada followed different rate paths, holding the other inputs fixed. In the model, rate cuts → higher predicted unemployment and rate hikes → lower—directionally consistent with policy timing and macro links, but not a causal claim.
              </p>
              <div className="overflow-x-auto rounded-lg border mb-8" style={{ borderColor: "var(--accent-primary)" }}>
                <table className="w-full pixel-text text-sm">
                  <thead>
                    <tr style={{ background: "rgba(116, 192, 252, 0.15)", color: "var(--pixel-white)" }}>
                      <th className="text-left p-3">Scenario</th>
                      <th className="text-right p-3">Rate change</th>
                      <th className="text-right p-3">New rate (%)</th>
                      <th className="text-right p-3">Month 1</th>
                      <th className="text-right p-3">Month 6</th>
                      <th className="text-right p-3">Month 12</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "var(--pixel-light-gray)" }}>
                    {SCENARIO_TABLE.map((row) => (
                      <tr key={row.scenario} style={{ borderTop: "1px solid var(--accent-primary)" }}>
                        <td className="p-3">{row.scenario}</td>
                        <td className="text-right p-3">{row.rateChange}</td>
                        <td className="text-right p-3">{row.newRate}</td>
                        <td className="text-right p-3">{row.m1}</td>
                        <td className="text-right p-3">{row.m6}</td>
                        <td className="text-right p-3">{row.m12}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="rounded-lg overflow-hidden border" style={{ borderColor: "var(--accent-primary)" }}>
                <img
                  src="/projects/macro-ml/scenario_simulation.png"
                  alt="Scenario simulation: 12-month unemployment trajectories"
                  className="w-full h-auto object-contain"
                  style={{ background: "var(--pixel-dark-blue)", minHeight: "200px" }}
                />
              </div>
            </ScrollReveal>

            {/* Conclusion */}
            <ScrollReveal direction="up">
              <h2
                className="text-xl sm:text-2xl font-bold pixel-text mb-4"
                style={{ color: "var(--pixel-white)" }}
              >
                CONCLUSION
              </h2>
              <p className="pixel-text text-sm mb-8 leading-relaxed" style={{ color: "var(--pixel-light-gray)" }}>
                Overall, the project shows that Canadian unemployment is predictable at a 1‑month horizon, but mainly because the series itself is highly persistent—macro indicators provide useful, but incremental, signal on top of “next month ≈ this month.” A separate scenario module takes that forecasting setup and uses it to ask policy questions about different interest‑rate paths, providing directional guidance on how unemployment might evolve under alternative decisions.
              </p>

              <h2
                className="text-xl sm:text-2xl font-bold pixel-text mb-6"
                style={{ color: "var(--pixel-white)" }}
              >
                TAKEAWAYS & LIMITATIONS
              </h2>
              <ul className="space-y-3 pixel-text text-sm leading-relaxed list-disc pl-6" style={{ color: "var(--pixel-light-gray)" }}>
                <li>Among the seven models tested, Persistence and Ridge provide the best balance of accuracy and interpretability, while more complex ML (VAR, Random Forest, XGBoost) does not deliver clear gains at this horizon.</li>
                <li>Unemployment is very sticky—today’s rate is already a strong predictor of next month—so feature engineering and model choice matter less than making sure the baseline persistence structure is handled correctly.</li>
                <li>The scenario model is best viewed as a structured “what if” tool layered on top of the forecasting pipeline: it translates hypothetical rate paths into plausible unemployment trajectories, but should not be interpreted as a causal estimate.</li>
                <li>Key limitations include a relatively short sample (177 months), possible structural breaks, and the need to extrapolate beyond the historical rate range in some scenarios—so results should be read as directional, not precise forecasts.</li>
                <li>Future work could add richer labour‑market data (e.g. vacancies, sectoral detail), extend to multi‑step horizons, and benchmark against professional forecasts or alternative macro models.</li>
              </ul>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded pixel-text font-medium transition-opacity hover:opacity-90"
              style={{
                background: "var(--accent-primary)",
                color: "var(--pixel-black)",
              }}
            >
              <ArrowLeft size={18} />
              BACK TO PORTFOLIO
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
