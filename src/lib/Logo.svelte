<div class="logo">
    <span class="s">S</span>
    Tier
</div>

<style>
    .logo {
        width: 120px;
        height: calc(100% - 10px);

        display: flex;
        align-items: center;
        gap: 5px;

        font-size: 1.6rem;

        user-select: none;
    }

    .s {
        width: 40px;
        height: 40px;

        display: grid;
        place-items: center;

        background-color: #80ff80;
        border-radius: 5px;
        color: #111;
        font-size: 1.6rem;
        font-weight: bold;
    }

    @media (max-width: 400px) {
        .logo {
            display: none;
        }
    }
</style>
