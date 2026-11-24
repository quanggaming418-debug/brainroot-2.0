import { HAND, type HandPose } from './assets';

export type { HandPose };

/**
 * Bàn tay rải sỏi — 5 pose PNG của ArtPack V3 (512×416, RGBA).
 * Chỉ là lớp hiển thị: số hạt còn lại và vị trí ô đều lấy từ sự kiện engine.
 * Hạt bay là phần tử riêng, không phải hạt vẽ sẵn trong ảnh tay.
 */
export function HandSprite({ pose }: { pose: HandPose; ms?: number }) {
  return (
    <>
      {(Object.keys(HAND) as HandPose[]).map((p) => (
        <img
          key={p}
          src={HAND[p]}
          alt=""
          aria-hidden="true"
          className={`oq2-handimg${p === pose ? ' is-on' : ''}`}
          draggable={false}
        />
      ))}
    </>
  );
}
