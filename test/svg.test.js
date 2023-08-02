import test from 'node:test';
import compare from './compare.js';

test('empty svg argument', async () => {
  await compare(
   'border-image: @svg();',
   'border-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3C%2Fsvg%3E);'
  );
});

test('svg background', async () => {
  await compare(`
    background:
      linear-gradient(red, blue),
      @svg(
        viewBox: 0 0 10 10;
        circle {
          cx, cy, r: 5;
          fill: red
        }
      );
  `, `
    background:
      linear-gradient(red, blue),
      url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2010%2010%22%3E%3Ccircle%20cx%3D%225%22%20cy%3D%225%22%20r%3D%225%22%20fill%3D%22red%22%3E%3C%2Fcircle%3E%3C%2Fsvg%3E);
  `);
});

test('svg complex rules', async () => {
  await compare(`
    background: @svg(
      viewBox: -50 -50 100 100;
      stroke-linecap: round;
      stroke: #000;
      path*6 {
        transform: rotate(@n(*60));
        d: M 0 0 0 44
           @M2x3(M 0 @ny(* -9)
                 L @pn(±9) @calc(-10*@ny - 5.8));
      }
    );`,
    `background: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%22-50%20-50%20100%20100%22%20stroke-linecap%3D%22round%22%20stroke%3D%22%23000%22%3E%3Cpath%20transform%3D%22rotate(60)%22%20d%3D%22M%200%200%200%2044%20M%200%20-9%20L%209%20-15.8%20M%200%20-9%20L%20-9%20-15.8%20M%200%20-18%20L%209%20-25.8%20M%200%20-18%20L%20-9%20-25.8%20M%200%20-27%20L%209%20-35.8%20M%200%20-27%20L%20-9%20-35.8%22%3E%3C%2Fpath%3E%3Cpath%20transform%3D%22rotate(120)%22%20d%3D%22M%200%200%200%2044%20M%200%20-9%20L%209%20-15.8%20M%200%20-9%20L%20-9%20-15.8%20M%200%20-18%20L%209%20-25.8%20M%200%20-18%20L%20-9%20-25.8%20M%200%20-27%20L%209%20-35.8%20M%200%20-27%20L%20-9%20-35.8%22%3E%3C%2Fpath%3E%3Cpath%20transform%3D%22rotate(180)%22%20d%3D%22M%200%200%200%2044%20M%200%20-9%20L%209%20-15.8%20M%200%20-9%20L%20-9%20-15.8%20M%200%20-18%20L%209%20-25.8%20M%200%20-18%20L%20-9%20-25.8%20M%200%20-27%20L%209%20-35.8%20M%200%20-27%20L%20-9%20-35.8%22%3E%3C%2Fpath%3E%3Cpath%20transform%3D%22rotate(240)%22%20d%3D%22M%200%200%200%2044%20M%200%20-9%20L%209%20-15.8%20M%200%20-9%20L%20-9%20-15.8%20M%200%20-18%20L%209%20-25.8%20M%200%20-18%20L%20-9%20-25.8%20M%200%20-27%20L%209%20-35.8%20M%200%20-27%20L%20-9%20-35.8%22%3E%3C%2Fpath%3E%3Cpath%20transform%3D%22rotate(300)%22%20d%3D%22M%200%200%200%2044%20M%200%20-9%20L%209%20-15.8%20M%200%20-9%20L%20-9%20-15.8%20M%200%20-18%20L%209%20-25.8%20M%200%20-18%20L%20-9%20-25.8%20M%200%20-27%20L%209%20-35.8%20M%200%20-27%20L%20-9%20-35.8%22%3E%3C%2Fpath%3E%3Cpath%20transform%3D%22rotate(360)%22%20d%3D%22M%200%200%200%2044%20M%200%20-9%20L%209%20-15.8%20M%200%20-9%20L%20-9%20-15.8%20M%200%20-18%20L%209%20-25.8%20M%200%20-18%20L%20-9%20-25.8%20M%200%20-27%20L%209%20-35.8%20M%200%20-27%20L%20-9%20-35.8%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E);`
  );
});
