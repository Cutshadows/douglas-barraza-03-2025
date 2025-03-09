<script setup lang="ts"></script>

<template>
	<div class="w-screen h-screen flex flex-col gap-0">
		<header class="p-4 bg-blue-600 h-[8%] w-full text-white">
			<div class="wrapper">
				<nav class="bg-white p-2 rounded">
					<RouterLink exact-active-class="active" class="item" to="/">Home</RouterLink>
					<RouterLink active-class="active" class="item" to="/team">Team</RouterLink>
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
.wrapper {
	display: flex;
	gap: 0px;
	justify-content: space-evenly;
	align-items: stretch;
	align-content: center;
	flex-wrap: wrap;
}

.item {
	width: 20px;
	margin-right: 20px;
	margin-left: 20px;
	align-self: center;
	font-size: 1.2em;
}

.active {
	font-size: larger;
	border-radius: 2px;
	font-weight: bold;
}
footer {
	border-top: 1px solid #ccc;
	color: #666;
	font-size: 0.8em;
}
</style>
