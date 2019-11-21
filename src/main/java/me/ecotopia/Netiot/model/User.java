package me.ecotopia.Netiot.model;

import javax.persistence.*;

@Entity
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name="id")
    private Integer id;

    @Column(name="name")
    private String name;

    @Column(name="email")
    private String email;

    @Column(name="facebook")
    private String facebook;

    @Column(name="phone")
    private String phone;

    @Column(name="city")
    private String city;

    @Column(name="district")
    private String district;

    //TODO maybe chane type to Date?
    @Column(name="date")
    private String date;


}
