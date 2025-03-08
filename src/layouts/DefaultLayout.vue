<script setup lang="ts"></script>

<template>
	<div class="w-screen h-screen flex flex-col gap-0">
		<header class="p-4 bg-blue-600 h-[8%] w-full text-white">
			<div class="wrapper">
				<nav class="bg-white p-2 rounded">
					<RouterLink to="/">Home</RouterLink>
					<RouterLink to="/team">Team</RouterLink>
				</nav>
			</div>
		</header>

		<main class="w-full flex-1 flex items-center justify-center">
			<div class="bg-red p-6 rounded shadow-lg w-[100%] max-w-[800px]">
				<router-view />
			</div>
		</main>

		<footer class="p-4 h-[10%] bg-gray-800 text-white text-center">
			&copy; 2024 My Vue App
		</footer>
	</div>
</template>

<style>
footer {
	border-top: 1px solid #ccc;
	color: #666;
	font-size: 0.8em;
}
</style>
