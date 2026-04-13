import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'dsa-master-progress';

function loadProgress() {
	if (!browser) return {};
	try {
		const data = localStorage.getItem(STORAGE_KEY);
		return data ? JSON.parse(data) : {};
	} catch {
		return {};
	}
}

function createProgressStore() {
	const { subscribe, set, update } = writable(loadProgress());

	if (browser) {
		subscribe((value) => {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
		});
	}

	return {
		subscribe,
		markTopicRead(moduleId, topicId) {
			update((p) => {
				if (!p[moduleId]) p[moduleId] = { topics: {}, quizScore: null };
				p[moduleId].topics[topicId] = true;
				return p;
			});
		},
		saveQuizScore(moduleId, score, total) {
			update((p) => {
				if (!p[moduleId]) p[moduleId] = { topics: {}, quizScore: null };
				p[moduleId].quizScore = { score, total, date: new Date().toISOString() };
				return p;
			});
		},
		reset() {
			set({});
		}
	};
}

export const progress = createProgressStore();
