import { useRouter } from "next/router"
import { getActorDetails } from "../../utils/actorData"
import Link from "next/link"
import React from "react"

const ActorDetailsPage = ({ actor }) => {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }


    return (
        <div className="section-title" style={{ color: "white" }}>


            <h1>Actor page</h1>
            {actor.profile_path ? (
                <img
                    src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                    alt={`${actor.name} Poster`}
                    style={{ maxWidth: "100%", height: "auto" }}
                />
            ) : (
                <p>No poster available</p>
            )}

            <h1>name: {actor.name}</h1>
            <h3>gender: {actor.gender ? 'female' : 'male'}</h3>
            <h3>popularity: {actor.popularity} | Minutes</h3>
            {actor.birthday && <h1>Birthday: {actor.birthday}</h1>}
            {actor.biography && <p>Biography: {actor.biography}</p>}


        </div>

    )

}


export async function getStaticPaths() {
    const paths = [
        { params: { actorId: "1" } },
        { params: { actorId: "2" } },
        { params: { actorId: "3" } },
    ]

    return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
    try {
        const actorId = params.actorId;
        const actor = await getActorDetails(actorId);

        return {
            props: {
                actor,
            },
            revalidate: 60 * 60,
        };
    } catch (error) {
        console.error('Error fetching movie details:', error.message);

        return {
            notFound: true,
        };
    }
}


export default ActorDetailsPage