import { useEffect, useRef, useState } from 'react';
import { BoardRenderer } from './boardRenderer';
import { INITIAL_SANDBOX_COUNTS, PITS, pitDisplayLabel, sandboxMoveOneSeed } from './prototypeOnlyModel';
import '../../styles/oanquan3d-prototype.css';

export default function OAnQuan3DPrototype() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<BoardRenderer | null>(null);
  const controlRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [counts, setCounts] = useState<readonly number[]>(() => [...INITIAL_SANDBOX_COUNTS]);
  const [selected, setSelected] = useState<number | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [message, setMessage] = useState('Chọn một ô trên bàn 3D hoặc bằng các nút bên dưới.');
  const boardState = useRef({ counts, selected });

  useEffect(() => {
    boardState.current = { counts, selected };
    rendererRef.current?.render(counts, selected);
  }, [counts, selected]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const initialize = () => {
      try {
        const renderer = new BoardRenderer(canvas);
        rendererRef.current = renderer;
        renderer.render(boardState.current.counts, boardState.current.selected);
        setUnavailable(false);
      } catch {
        rendererRef.current?.destroy();
        rendererRef.current = null;
        setUnavailable(true);
      }
    };
    initialize();
    const observer = new ResizeObserver(() => rendererRef.current?.redraw());
    observer.observe(canvas);
    const onLoss = (event: Event) => {
      event.preventDefault();
      rendererRef.current = null;
      setUnavailable(true);
    };
    canvas.addEventListener('webglcontextlost', onLoss);
    canvas.addEventListener('webglcontextrestored', initialize);
    return () => {
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', onLoss);
      canvas.removeEventListener('webglcontextrestored', initialize);
      rendererRef.current?.destroy();
      rendererRef.current = null;
    };
  }, []);

  function choosePit(index: number) {
    setSelected(index);
    setMessage(pitDisplayLabel(PITS[index], counts[index]) + '. Đây là bản sandbox, chưa có luật chính thức.');
  }

  function reset() {
    setCounts([...INITIAL_SANDBOX_COUNTS]);
    setSelected(null);
    setMessage('Đã đặt lại bàn mô phỏng. Chưa tính lượt hoặc điểm.');
  }

  function demonstrate() {
    if (selected === null || counts[selected] <= 0) return;
    const next = (selected + 1) % PITS.length;
    setCounts((previous) => sandboxMoveOneSeed(previous, selected));
    setMessage('Đã chuyển minh họa 1 hạt từ ' + PITS[selected].label + ' sang ' + PITS[next].label +
      '. Đây KHÔNG phải nước đi hoặc luật Ô ăn quan đã duyệt.');
  }

  function handleCanvasClick(event: React.MouseEvent<HTMLCanvasElement>) {
    const index = rendererRef.current?.pick(event.clientX, event.clientY);
    if (index !== null && index !== undefined) choosePit(index);
  }

  function handlePitKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const offset: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 1, ArrowUp: -1 };
    if (Object.hasOwn(offset, event.key)) {
      event.preventDefault();
      const target = (index + PITS.length + offset[event.key]) % PITS.length;
      controlRefs.current[target]?.focus();
    }
  }

  return (
    <main className="oanquan3d" id="main-content">
      <a className="oanquan3d__back" href="/">← Về khu vườn Brainroot</a>
      <div className="oanquan3d__layout">
        <section className="oanquan3d__intro" aria-labelledby="oanquan3d-title">
          <div className="oanquan3d__eyebrow">BRAINROOT / GREEN PLAY / 3D LAB</div>
          <h1 id="oanquan3d-title">Ô ăn quan <span>xanh</span></h1>
          <p>Chạm vào thế giới trò chơi dân gian bằng một bàn gỗ 3D và những hạt mầm nhỏ.</p>
          <div className="oanquan3d__prototype-notice" role="note">
            <strong>Bản thử nghiệm đồ họa 3D.</strong> Luật chơi và điểm số chưa được duyệt. Chưa có chế độ chơi online.
          </div>
        </section>

        <section className="oanquan3d__stage" aria-label="Mô hình bàn chơi ba chiều">
          <div className="oanquan3d__stage-decor" aria-hidden="true">✦  Gieo một hạt, nuôi một ý tưởng  ✦</div>
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="oanquan3d__canvas"
              style={{ visibility: unavailable ? 'hidden' : undefined }}
              aria-hidden="true"
              title="Chọn ô bằng chuột hoặc dùng các nút HTML phía dưới"
            />
          {unavailable && (
            <div className="oanquan3d__fallback" role="status">
              <strong>Không thể hiển thị bàn 3D</strong>
              <p>Danh sách 12 ô bên dưới vẫn cho phép khám phá và chuyển hạt minh họa.</p>
            </div>
          )}
          <div className="oanquan3d__stage-caption">
            {unavailable ? 'Chế độ dùng nút HTML' : 'Mô hình 3D dựng bằng WebGL2'} · Không phải bàn chơi chính thức
          </div>
        </section>

        <section className="oanquan3d__panel" aria-labelledby="oanquan3d-controls-title">
          <div className="oanquan3d__panel-header">
            <div>
              <span className="oanquan3d__label">BÀN THỬ NGHIỆM</span>
              <h2 id="oanquan3d-controls-title">Khám phá các ô</h2>
            </div>
            <span className="oanquan3d__status">12 ô</span>
          </div>
          <p className="oanquan3d__help">Chọn ô bằng chuột hoặc Tab/Enter. Dùng phím mũi tên để chuyển giữa các nút.</p>
          <div className="oanquan3d__grid" role="group" aria-label="Các ô mô phỏng">
            {PITS.map((pit, index) => (
              <button
                key={pit.id}
                ref={(element) => { controlRefs.current[index] = element; }}
                type="button"
                className={'oanquan3d__pit' + (selected === index ? ' is-selected' : '')}
                aria-pressed={selected === index}
                aria-label={pitDisplayLabel(pit, counts[index])}
                onClick={() => choosePit(index)}
                onKeyDown={(event) => handlePitKey(event, index)}
              >
                <span>{pit.isQuan ? 'Ô quan' : pit.label.replace('Ô dân ', '')}</span>
                <strong>{counts[index]} <small>hạt</small></strong>
              </button>
            ))}
          </div>
          <p className="oanquan3d__announce" role="status" aria-live="polite">{message}</p>
          <div className="oanquan3d__actions">
            <button type="button" className="oanquan3d__action-primary" disabled={selected === null || counts[selected] === 0}
              onClick={demonstrate}>Chuyển thử 1 hạt</button>
            <button type="button" className="oanquan3d__action-secondary" onClick={reset}>Đặt lại bàn</button>
          </div>
          <p className="oanquan3d__disclaimer">
            Chuyển hạt chỉ là mô phỏng thao tác, không đại diện cho luật Ô ăn quan.
          </p>
        </section>
      </div>
    </main>
  );
}
