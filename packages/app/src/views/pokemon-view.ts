import { View } from "@calpoly/mustang";
import { html } from "lit";
import {property, state} from "lit/decorators.js";
import { Pokemon } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class PokemonViewElement extends View<Model, Msg> {
    @property()
    userid?: string;

    @state()
    get pokemon(): Pokemon | undefined {
        return this.model.pokemon;
    }

    constructor() {
        super("pokemon:model");
    }

    render() {
        const {
            name,
            description,
            imageUrl,
            type
        } = this.pokemon || {};
        return html`
            <dl>
                <dt>Username</dt>
                <dd>${name}</dd>
                <dt>Description</dt>
                <dd>${description}</dd>
                <dt>Image</dt>
                <dd>${imageUrl}</dd>
                <dt>Type</dt>
                <dd>${type}</dd>
        `;
    }

    // etc


    attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
    ) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (
            name === "name" &&
            oldValue !== newValue &&
            newValue
        ) {
            this.dispatchMessage([
                "pokemon/select",
                {name: newValue}
            ]);
        }
    }
}

