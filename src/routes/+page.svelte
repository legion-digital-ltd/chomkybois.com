<script language="ts">
    let email = "";
    let isFetching = false;
    let error = "";
    let response = new Response("", { status: 202 });
    let readMore = false;

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
    flex-col
    items-center
    justify-center
    gap-4
">

    <main class="
        bg-white
        px-10
        min-[640px]:px-[8vw]
        pt-8
        pb-4
        min-[640px]:py-[5vw]
        rounded-lg
        shadow-lg
        border-4
        border-black
        flex
        flex-col
        items-center
        gap-2
        max-w-full
        min-[640px]:max-w-[50vw]
    ">
        <img src="logo.svg" alt="Chomkybois logo" class="
            h-1/3
            min-[640px]:w-5/8
            mb-[2vw]
        " />

        <p class="
            min-[640px]:text-2xl
            font-bold
            leading-tight
        ">Chomkybois is launching our own platform for the chomky community!</p>

        <button on:click={() => readMore = true} class="
            border
            border-black
            rounded
            px-2
            py-1
            min-[640px]:text-xl
            hover:bg-[#eee]
            focus:bg-[#eee]
        ">Read more about it...</button>

        {#if readMore}
            <div class="
                absolute
                z-10
                bg-black
                opacity-50
                w-screen
                h-screen
                inset-0
            "></div>
            <div class="
                absolute
                z-20
                bg-white
                shadow
                px-6
                py-4
                rounded-lg
                border-2
                border-black
                flex
                flex-col
                gap-2
                min-[640px]:text-2xl
            ">
                <p class="
                    leading-tight
                ">We want a place for our community that doesn't have to deal with Facebook's overbearing censorship, Instagram's suppressive algorithm, or reddit's... well... just reddit in general.</p>

                <p class="
                    leading-tight
                ">We want our community to have its own space where we can enjoy the wholesome, funny and loving atmosphere where we all have a say in how it's run.</p>

                <button on:click={() => readMore = false} class="
                    px-2
                    py-1
                    border
                    border-black
                    rounded
                    self-start
                    hover:bg-[#eee]
                    focus:bg-[#eee]
                ">Close</button>
            </div>            
        {/if}

        <p class="
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
                focus:border-orange-500
                flex-1
                text-[4vw]
                min-[640px]:text-[2vh]
                disabled:focus:border-black
                disabled:cursor-not-allowed
            " />

            <button type="submit" disabled={response.status === 200 || isFetching} class="
                bg-orange-500
                px-4
                py-2
                rounded
                font-bold
                border
                border-black
                hover:bg-orange-600
                active:bg-orange-600
                self-center
                text-[4vw]
                min-[640px]:text-[2vh]
                disabled:cursor-not-allowed
                disabled:hover:bg-orange-500
                disabled:active:bg-orange-500
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

        <div class="
            flex
            gap-10
            mt-6
        ">
            <a href="https://facebook.com/chomkybois" rel="noopener noreferrer" target="_blank">
                <img src="facebook.png" alt="Facebook logo" class="h-[8vw] min-[640px]:h-10" />
            </a>
            <a href="https://instagram.com/chomkstagram" rel="noopener noreferrer" target="_blank">
                <img src="instagram.png" alt="Instagram logo" class="h-[8vw] min-[640px]:h-10" />
            </a>
            <a href="https://reddit.com/r/chomkybois" rel="noopener noreferrer" target="_blank">
                <img src="reddit.png" alt="reddit logo" class="h-[8vw] min-[640px]:h-10" />
            </a>
        </div>
    </main>

</div>