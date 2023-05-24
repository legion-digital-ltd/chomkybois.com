<script language="ts">
    let email = "";
    let isFetching = false;
    let error = "";
    let response = new Response("", { status: 202 });

    const handleSubmit = async () => {
        if (response.status === 200) return;
        if (!email) return error = "Please enter an email address.";
        if (!email.match(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm)) return error = "Please enter a valid email address.";

        isFetching = true;
        try {
            response = await fetch('/', {
                method: 'POST',
                body: JSON.stringify({ email: email }),
                headers: {
                    'content-type': 'application/json'
                }
            });

            if (response.status !== 200) throw new Error(String(response.body));

            email = "";
            isFetching = false;
            return;

        } catch (error) {
            isFetching = false;
            return error = String(error);
        }
    }

</script>

<div class="
    w-screen
    h-screen
    bg-dgray
    flex
    items-center
    justify-center
">

    <main class="
        bg-white
        px-10
        min-[640px]:px-[8vw]
        py-12
        min-[640px]:py-[5vw]
        rounded-lg
        shadow-lg
        border-4
        border-black
        flex
        flex-col
        items-center
        gap-4
        max-w-full
        min-[640px]:max-w-[50vw]
    ">
        <img src="logo.svg" alt="Chomkybois logo" class="
            h-2/3
            min-[640px]:w-5/8
            mb-[3vw]
        " />

        <p class="
            text-[5vw]
            min-[640px]:text-3xl
            font-bold
            leading-tight
        ">Chomkybois is launching our own platform for the chomky community!</p>

        <p class="
            text-[4vw]
            min-[640px]:text-2xl
        ">Enter your email address below to be kept up-to-date and for the chance to be invited to an early version.</p>

        <form on:submit|preventDefault|once={handleSubmit} class="
            flex
            flex-col
            min-[640px]:flex-row
            gap-2
            w-full
            justify-center
        ">
            <input disabled={response.status === 200 || isFetching} type="email" placeholder="Email" bind:value={email} class="
                border
                border-black
                rounded
                px-4
                py-2
                bg-[#ddd]
                focus:border-orange-600
                flex-1
                text-[4vw]
                min-[640px]:text-[2vh]
                disabled:focus:border-black
                disabled:cursor-not-allowed
            " />

            <button type="submit" disabled={response.status === 200 || isFetching} class="
                bg-orange-600
                px-4
                py-2
                rounded
                font-bold
                border
                border-black
                hover:bg-orange-400
                active:bg-orange-400
                self-center
                text-[4vw]
                min-[640px]:text-[2vh]
                disabled:cursor-not-allowed
                disabled:hover:bg-orange-600
                disabled:active:bg-orange-600
            ">Submit</button>
        </form>

        {#if error}
            <p class="
                text-xl
                text-red-700
                font-bold
            ">{error}</p>
        {/if}

        {#if response.status === 200}
            <p class="
                text-xl
            ">Thanks! Your email address has been submitted.</p>
        {/if}
    </main>

</div>