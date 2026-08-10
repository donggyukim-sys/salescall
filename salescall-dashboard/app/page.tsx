import analytics from "@/data/analytics.json";

type Day = {
  date: string;
  n_calls: number;
  avg_overall: number;
  grade: string;
  axis_avg: Record<string, number>;
  compliance_flags: number;
  coaching: string[];
};

const AXES = [
  "오프닝&라포",
  "니즈파악",
  "가치제안",
  "이의처리",
  "클로징",
  "커뮤니케이션",
  "컴플라이언스",
];

function gradeColor(grade: string) {
  switch (grade) {
    case "탁월":
      return "bg-emerald-100 text-emerald-800";
    case "우수":
      return "bg-blue-100 text-blue-800";
    case "보통":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-rose-100 text-rose-800";
  }
}

function fmtDiff(curr: number, prev?: number) {
  if (prev === undefined) return null;
  const diff = Math.round((curr - prev) * 100) / 100;
  if (diff === 0) return <span className="text-gray-400">− 0.0</span>;
  const up = diff > 0;
  return (
    <span className={up ? "text-emerald-600" : "text-rose-600"}>
      {up ? "▲" : "▼"} {Math.abs(diff).toFixed(2)}
    </span>
  );
}

export default function Page() {
  const days = (analytics.days as Day[])
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));

  const latest = days[days.length - 1];
  const prev = days.length > 1 ? days[days.length - 2] : undefined;
  const totalCalls = days.reduce((sum, d) => sum + d.n_calls, 0);

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <header className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            세일즈콜 코칭 대시보드
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            SCORE-7 프레임워크 · 일 단위 강점/약점 추이
          </p>
        </div>
        <div className="text-sm">
          <span className="text-gray-500 mr-2">상담원</span>
          <span className="font-medium">{analytics.rep.name}</span>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white border border-line rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">
            최근일({latest.date}) 평균
          </p>
          <p className="text-3xl font-bold">{latest.avg_overall.toFixed(2)}</p>
          {prev && (
            <p className="text-xs mt-1">
              전일 대비 {fmtDiff(latest.avg_overall, prev.avg_overall)}
            </p>
          )}
        </div>

        <div className="bg-white border border-line rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">최근일 등급</p>
          <span
            className={`inline-block px-2.5 py-1 rounded-full text-sm font-semibold ${gradeColor(
              latest.grade
            )}`}
          >
            {latest.grade}
          </span>
          <p className="text-xs text-gray-500 mt-2">{latest.n_calls}건 분석</p>
        </div>

        <div className="bg-white border border-line rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">누적 분석 콜</p>
          <p className="text-3xl font-bold">{totalCalls}</p>
          <p className="text-xs text-gray-500 mt-1">{days.length}일</p>
        </div>

        <div className="bg-white border border-line rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">최근일 컴플라이언스 플래그</p>
          <p className="text-3xl font-bold">{latest.compliance_flags}</p>
          <p
            className={`text-xs mt-1 ${
              latest.compliance_flags > 0 ? "text-warn" : "text-emerald-600"
            }`}
          >
            {latest.compliance_flags > 0 ? "주의 필요" : "양호"}
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">일자별 추이</h2>
        <div className="bg-white border border-line rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-left">
                <th className="px-4 py-2 font-medium">날짜</th>
                <th className="px-4 py-2 font-medium">콜 수</th>
                <th className="px-4 py-2 font-medium">평균</th>
                <th className="px-4 py-2 font-medium">등급</th>
                {AXES.map((a) => (
                  <th key={a} className="px-4 py-2 font-medium whitespace-nowrap">
                    {a}
                  </th>
                ))}
                <th className="px-4 py-2 font-medium">컴플라이언스</th>
              </tr>
            </thead>
            <tbody>
              {days.map((d) => (
                <tr key={d.date} className="border-t border-line">
                  <td className="px-4 py-2 font-medium">{d.date}</td>
                  <td className="px-4 py-2">{d.n_calls}</td>
                  <td className="px-4 py-2 font-semibold">
                    {d.avg_overall.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${gradeColor(
                        d.grade
                      )}`}
                    >
                      {d.grade}
                    </span>
                  </td>
                  {AXES.map((a) => (
                    <td key={a} className="px-4 py-2 text-gray-600">
                      {d.axis_avg[a]?.toFixed(2) ?? "-"}
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    {d.compliance_flags > 0 ? (
                      <span className="text-warn font-semibold">
                        {d.compliance_flags}건
                      </span>
                    ) : (
                      <span className="text-emerald-600">0건</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {days.map((d) => (
          <div key={d.date} className="bg-white border border-line rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold">{d.date}</p>
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${gradeColor(
                  d.grade
                )}`}
              >
                {d.grade} · {d.avg_overall.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-2">이번 코칭 포인트</p>
            <ul className="space-y-2">
              {d.coaching.map((c, i) => (
                <li key={i} className="text-sm text-gray-700 leading-relaxed">
                  <span className="text-gray-400 mr-1">{i + 1}.</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <footer className="mt-10 text-xs text-gray-400">
        마지막 갱신: {analytics.updated_at} · data/analytics.json 커밋 시 자동 반영
      </footer>
    </main>
  );
}
