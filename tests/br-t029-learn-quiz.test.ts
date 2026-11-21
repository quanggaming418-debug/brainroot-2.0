import test from 'node:test';
import assert from 'node:assert/strict';
import { LEARN_FACTS, getFactById, getFactsForTopic } from '../src/data/learnFacts';
import { GREEN_LEARN_TOPICS } from '../src/data/learn';
import { QUIZ_QUESTIONS } from '../src/data/quiz';
import {
  QUIZ_ROUND_SIZE,
  createQuizRound,
  scoreRound,
} from '../src/features/learn/quizEngine';

test('BR-T029 facts: every fact has a vi/en text and an https source; unverified green-space figures are held back', () => {
  assert.equal(LEARN_FACTS.length, 9);
  assert.equal(new Set(LEARN_FACTS.map((f) => f.id)).size, 9);
  for (const fact of LEARN_FACTS) {
    assert.ok(fact.vi.length > 20 && fact.en.length > 20, fact.id);
    assert.match(fact.source.url, /^https:\/\//);
    assert.ok(fact.source.name.length > 2);
    assert.ok(fact.source.year === null || (fact.source.year >= 2020 && fact.source.year <= 2026));
    assert.ok(GREEN_LEARN_TOPICS.some((t) => t.id === fact.topicId), `${fact.id} topic`);
  }
  const all = JSON.stringify(LEARN_FACTS);
  assert.doesNotMatch(all, /9 m²|9 m2|0,5 ha|0\.5 ha|50 m²/, 'green-space thresholds must stay hidden');
  assert.deepEqual(getFactsForTopic('learn-green-spaces'), []);
});

test('BR-T029 facts: figures are copied exactly and scope caveats are kept', () => {
  assert.match(getFactById('F-RT-1')!.vi, /33%.*3,9 triệu tấn/);
  assert.match(getFactById('F-RT-3')!.vi, /41,3 kg/);
  assert.match(getFactById('F-TD-2')!.en, /8%/);
  const energy = getFactById('F-NL-1')!;
  assert.match(energy.vi, /13%.*10%.*75%/);
  assert.match(energy.scopeNote!.vi, /OECD/);
  assert.match(energy.scopeNote!.en, /OECD/);
  assert.match(getFactById('F-N-1')!.vi, /2,1 tỷ.*106 triệu/);
  assert.match(getFactById('F-N-2')!.en, /961 million.*68%.*74%/);
  // No Vietnam-specific claim for water/energy yet
  for (const id of ['F-NL-1', 'F-N-1', 'F-N-2']) {
    assert.doesNotMatch(getFactById(id)!.vi, /Việt Nam/);
  }
});

test('BR-T029 quiz bank: 12 well-formed questions, each tied to a sourced fact', () => {
  assert.equal(QUIZ_QUESTIONS.length, 12);
  assert.deepEqual(
    QUIZ_QUESTIONS.map((q) => q.id),
    Array.from({ length: 12 }, (_, i) => `Q-${String(i + 1).padStart(2, '0')}`),
  );
  const expectedAnswers = [1, 3, 1, 2, 1, 0, 1, 2, 2, 1, 1, 1];
  QUIZ_QUESTIONS.forEach((q, i) => {
    assert.equal(q.answer, expectedAnswers[i], q.id);
    assert.equal(q.options.vi.length, 4);
    assert.equal(q.options.en.length, 4);
    assert.equal(new Set(q.options.vi).size, 4, `${q.id} duplicate options`);
    assert.ok(q.q.vi.length > 10 && q.q.en.length > 10);
    assert.ok(q.explain.vi.length > 5 && q.explain.en.length > 5);
    assert.ok(getFactById(q.factId), `${q.id} fact ${q.factId}`);
  });
});

test('BR-T029 quiz engine: 5 distinct questions per round, shuffled options keep exactly one correct choice', () => {
  let seed = 7;
  const rng = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let r = 0; r < 25; r += 1) {
    const round = createQuizRound(rng);
    assert.equal(round.length, QUIZ_ROUND_SIZE);
    assert.equal(new Set(round.map((i) => i.question.id)).size, QUIZ_ROUND_SIZE);
    for (const item of round) {
      assert.deepEqual(
        item.choices.map((c) => c.originalIndex).sort(),
        [0, 1, 2, 3],
      );
      const correct = item.choices.filter((c) => c.isCorrect);
      assert.equal(correct.length, 1);
      assert.equal(correct[0].originalIndex, item.question.answer);
    }
  }
  assert.equal(scoreRound([true, false, true, true, false]), 3);
});
