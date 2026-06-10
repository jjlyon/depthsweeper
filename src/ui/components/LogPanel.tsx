export function LogPanel({log}:{log:string[]}){ return <section className="log"><h3>Log</h3>{log.map((m,i)=><p key={i}>{m}</p>)}</section>; }
